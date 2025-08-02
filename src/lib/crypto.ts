export interface EncryptionResult {
  encryptedContent: string
  salt: string
  iv: string
  keyHash: string
  authTag: string
  version: string
}

export interface DecryptionParams {
  encryptedContent: string
  salt: string
  iv: string
  keyHash: string
  authTag: string
  version: string
  password: string
}

const SECURITY_CONFIG = {
  PBKDF2_ITERATIONS: 10000000,
  SALT_SIZE: 64,
  IV_SIZE: 16,
  KEY_SIZE: 32,
  AUTH_TAG_SIZE: 16,
  CRYPTO_VERSION: '1.0',
  SECURE_CLEAR_PASSES: 3,
} as const

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes.buffer
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]!)
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

function memClean(data: Uint8Array): void {
  const patterns = [0x00, 0xff, 0x00]

  for (const pattern of patterns) {
    data.fill(pattern)
  }

  crypto.getRandomValues(data)
  data.fill(0)
}

async function deriveKey(
  password: string,
  salt: ArrayBuffer
): Promise<{
  key: CryptoKey
  hash: string
  derivedKeyMaterial: ArrayBuffer
}> {
  const passwordBuffer = new TextEncoder().encode(password)

  try {
    const passwordKey = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    )

    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: SECURITY_CONFIG.PBKDF2_ITERATIONS,
        hash: 'SHA-256',
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )

    const keyBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: SECURITY_CONFIG.PBKDF2_ITERATIONS,
        hash: 'SHA-256',
      },
      passwordKey,
      256
    )

    return {
      key: derivedKey,
      hash: arrayBufferToHex(keyBits),
      derivedKeyMaterial: keyBits,
    }
  } finally {
    memClean(new Uint8Array(passwordBuffer))
  }
}

export async function encryptText(
  text: string,
  password: string
): Promise<EncryptionResult> {
  if (!text || !password) {
    throw new Error('Text and password are required')
  }

  if (password.length < 12) {
    throw new Error('Password must be at least 12 characters for security')
  }

  const salt = crypto.getRandomValues(new Uint8Array(SECURITY_CONFIG.SALT_SIZE))
  const iv = crypto.getRandomValues(new Uint8Array(SECURITY_CONFIG.IV_SIZE))

  const {
    key,
    hash: keyHash,
    derivedKeyMaterial,
  } = await deriveKey(password, salt.buffer)

  const textBuffer = new TextEncoder().encode(text)

  try {
    const additionalData = new TextEncoder().encode(
      SECURITY_CONFIG.CRYPTO_VERSION
    )

    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
        additionalData: additionalData,
        tagLength: 128,
      },
      key,
      textBuffer
    )

    const encryptedData = new Uint8Array(encryptedBuffer)
    const ciphertext = encryptedData.slice(0, -16)
    const authTag = encryptedData.slice(-16)

    return {
      encryptedContent: arrayBufferToBase64(ciphertext.buffer),
      salt: arrayBufferToHex(salt.buffer),
      iv: arrayBufferToHex(iv.buffer),
      keyHash: keyHash,
      authTag: arrayBufferToHex(authTag.buffer),
      version: SECURITY_CONFIG.CRYPTO_VERSION,
    }
  } finally {
    memClean(new Uint8Array(derivedKeyMaterial))
    memClean(new Uint8Array(textBuffer))
  }
}

export async function decryptText({
  encryptedContent,
  salt,
  iv,
  keyHash,
  authTag,
  version,
  password,
}: DecryptionParams): Promise<string> {
  try {
    if (version !== SECURITY_CONFIG.CRYPTO_VERSION) {
      throw new Error('Unsupported encryption version')
    }

    const saltBuffer = hexToArrayBuffer(salt)
    const ivBuffer = hexToArrayBuffer(iv)
    const authTagBuffer = hexToArrayBuffer(authTag)
    const encryptedBuffer = base64ToArrayBuffer(encryptedContent)

    const {
      key,
      hash: derivedKeyHash,
      derivedKeyMaterial,
    } = await deriveKey(password, saltBuffer)

    try {
      if (derivedKeyHash !== keyHash) {
        throw new Error('Invalid password')
      }

      const fullEncryptedBuffer = new Uint8Array(
        encryptedBuffer.byteLength + authTagBuffer.byteLength
      )
      fullEncryptedBuffer.set(new Uint8Array(encryptedBuffer), 0)
      fullEncryptedBuffer.set(
        new Uint8Array(authTagBuffer),
        encryptedBuffer.byteLength
      )

      const additionalData = new TextEncoder().encode(
        SECURITY_CONFIG.CRYPTO_VERSION
      )

      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: new Uint8Array(ivBuffer),
          additionalData: additionalData,
          tagLength: 128,
        },
        key,
        fullEncryptedBuffer.buffer
      )

      const decryptedText = new TextDecoder().decode(decryptedBuffer)

      if (!decryptedText) {
        throw new Error(
          'Decryption failed - invalid password or corrupted data'
        )
      }

      return decryptedText
    } finally {
      memClean(new Uint8Array(derivedKeyMaterial))
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid password') {
        throw error
      }

      if (
        error.name === 'OperationError' ||
        error.name === 'InvalidAccessError' ||
        error.name === 'DataError'
      ) {
        throw new Error('Invalid password or corrupted data')
      }
    }
    throw new Error(
      'Decryption failed: ' +
        (error instanceof Error ? error.message : 'Unknown error')
    )
  }
}

export function generateSecurePassword(length: number = 64): string {
  if (length < 20) {
    throw new Error('Passwords must be at least 20 characters')
  }

  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    extended: 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ',
  }

  const allChars =
    charset.uppercase + charset.lowercase + charset.numbers + charset.symbols
  const randomBytes = crypto.getRandomValues(new Uint8Array(length))
  let password = ''

  const categories = [
    charset.uppercase,
    charset.lowercase,
    charset.numbers,
    charset.symbols,
  ]
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]!
    password += category[randomBytes[i]! % category.length]
  }

  for (let i = categories.length; i < length; i++) {
    password += allChars[randomBytes[i]! % allChars.length]
  }

  const passwordArray = password.split('')
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = randomBytes[i % randomBytes.length]! % (i + 1)
    ;[passwordArray[i], passwordArray[j]] = [
      passwordArray[j]!,
      passwordArray[i]!,
    ]
  }

  return passwordArray.join('')
}

export function validatePasswordStrength(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
  securityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME'
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 12) score += 2
  else if (password.length >= 8) score += 1
  else feedback.push('Password must be at least 12 characters for security')

  if (password.length >= 20) score += 2
  else feedback.push('Consider using 20+ characters for maximum security')

  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Include lowercase letters')

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Include uppercase letters')

  if (/[0-9]/.test(password)) score += 1
  else feedback.push('Include numbers')

  if (/[^a-zA-Z0-9]/.test(password)) score += 2
  else feedback.push('Include special characters')

  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 1
  if (password.length >= 32) score += 2
  if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{16,}/.test(password))
    score += 2

  const entropy = calculatePasswordEntropy(password)
  if (entropy >= 128) score += 3
  else if (entropy >= 80) score += 2
  else if (entropy >= 60) score += 1

  let securityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME'
  if (score >= 12) securityLevel = 'EXTREME'
  else if (score >= 8) securityLevel = 'HIGH'
  else if (score >= 5) securityLevel = 'MEDIUM'
  else securityLevel = 'LOW'

  return {
    isValid: score >= 8,
    score,
    feedback,
    securityLevel,
  }
}

function calculatePasswordEntropy(password: string): number {
  let charsetSize = 0

  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32

  return Math.log2(Math.pow(charsetSize, password.length))
}

export function clearMemory(data: string | ArrayBuffer | Uint8Array): void {
  if (typeof data === 'string') {
    return
  }

  if (data instanceof ArrayBuffer) {
    memClean(new Uint8Array(data))
  } else if (data instanceof Uint8Array) {
    memClean(data)
  }
}

export function isWebCryptoSupported(): boolean {
  return (
    typeof crypto !== 'undefined' &&
    typeof crypto.subtle !== 'undefined' &&
    typeof crypto.getRandomValues !== 'undefined' &&
    crypto.subtle.importKey !== undefined &&
    crypto.subtle.deriveKey !== undefined &&
    crypto.subtle.encrypt !== undefined &&
    crypto.subtle.decrypt !== undefined
  )
}

export function isSecureContext(): boolean {
  if (typeof window === 'undefined') {
    return true
  }

  return (
    window.location.protocol === 'https:' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )
}

export function validateSecurityEnvironment(): void {
  if (!isWebCryptoSupported()) {
    throw new Error(
      'WebCrypto API with required features is not supported. I require a modern browser with full WebCrypto support.'
    )
  }

  if (!isSecureContext()) {
    throw new Error(
      'cryptographic operations require a secure context (HTTPS). Insecure contexts are not permitted.'
    )
  }

  if (typeof window !== 'undefined') {
    if (
      window.location.protocol === 'http:' &&
      window.location.hostname !== 'localhost'
    ) {
      throw new Error('we require HTTPS in production environments')
    }
  }
}
