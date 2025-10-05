'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

type KeyType = 'RSA' | 'Ed25519' | 'ECDSA'
type RSAKeySize = '2048' | '3072' | '4096'
type ECDSACurve = 'P-256' | 'P-384' | 'P-521'

const SshKeyGenerator = () => {
  const [keyPair, setKeyPair] = useState<{
    publicKey: string
    privateKey: string
    fingerprint?: string
  } | null>(null)
  const [keyType, setKeyType] = useState<KeyType>('RSA')
  const [rsaKeySize, setRsaKeySize] = useState<RSAKeySize>('2048')
  const [ecdsaCurve, setEcdsaCurve] = useState<ECDSACurve>('P-256')
  const [password, setPassword] = useState('')
  const [usePassword, setUsePassword] = useState(false)
  const [comment, setComment] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [copiedPublic, setCopiedPublic] = useState(false)
  const [copiedPrivate, setCopiedPrivate] = useState(false)

  const arrayBufferToPem = (buffer: ArrayBuffer, type: string): string => {
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
    const formatted = base64.match(/.{1,64}/g)?.join('\n') || base64
    return `-----BEGIN ${type}-----\n${formatted}\n-----END ${type}-----`
  }

  const encryptPrivateKey = async (
    privateKeyPem: string,
    password: string
  ): Promise<string> => {
    const encoder = new TextEncoder()
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const iv = crypto.getRandomValues(new Uint8Array(12))

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    )

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    )

    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encoder.encode(privateKeyPem)
    )

    const combined = new Uint8Array(
      salt.length + iv.length + encrypted.byteLength
    )
    combined.set(salt, 0)
    combined.set(iv, salt.length)
    combined.set(new Uint8Array(encrypted), salt.length + iv.length)

    const encryptedBase64 = btoa(String.fromCharCode(...combined))
    const formatted =
      encryptedBase64.match(/.{1,64}/g)?.join('\n') || encryptedBase64

    return `-----BEGIN ENCRYPTED PRIVATE KEY-----\nProc-Type: 4,ENCRYPTED\nDEK-Info: AES-256-GCM\n\n${formatted}\n-----END ENCRYPTED PRIVATE KEY-----`
  }

  const generateFingerprint = async (
    publicKey: ArrayBuffer
  ): Promise<string> => {
    const hash = await crypto.subtle.digest('SHA-256', publicKey)
    const hashArray = Array.from(new Uint8Array(hash))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join(':')
  }

  const generateRSAKey = async () => {
    const keyPairObj = await crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: parseInt(rsaKeySize),
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt']
    )

    const publicKey = await crypto.subtle.exportKey(
      'spki',
      keyPairObj.publicKey
    )
    const privateKey = await crypto.subtle.exportKey(
      'pkcs8',
      keyPairObj.privateKey
    )

    const publicKeyPem = arrayBufferToPem(publicKey, 'RSA PUBLIC KEY')
    let privateKeyPem = arrayBufferToPem(privateKey, 'RSA PRIVATE KEY')

    if (usePassword && password) {
      privateKeyPem = await encryptPrivateKey(privateKeyPem, password)
    }

    const fingerprint = await generateFingerprint(publicKey)

    const commentSuffix = comment ? ` ${comment}` : ''
    const publicKeyWithComment = `${publicKeyPem}${commentSuffix}`

    return {
      publicKey: publicKeyWithComment,
      privateKey: privateKeyPem,
      fingerprint,
    }
  }

  const generateECDSAKey = async () => {
    const keyPairObj = await crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: ecdsaCurve,
      },
      true,
      ['sign', 'verify']
    )

    const publicKey = await crypto.subtle.exportKey(
      'spki',
      keyPairObj.publicKey
    )
    const privateKey = await crypto.subtle.exportKey(
      'pkcs8',
      keyPairObj.privateKey
    )

    const publicKeyPem = arrayBufferToPem(publicKey, 'PUBLIC KEY')
    let privateKeyPem = arrayBufferToPem(privateKey, 'EC PRIVATE KEY')

    if (usePassword && password) {
      privateKeyPem = await encryptPrivateKey(privateKeyPem, password)
    }

    const fingerprint = await generateFingerprint(publicKey)

    const commentSuffix = comment ? ` ${comment}` : ''
    const publicKeyWithComment = `${publicKeyPem}${commentSuffix}`

    return {
      publicKey: publicKeyWithComment,
      privateKey: privateKeyPem,
      fingerprint,
    }
  }

  const generateEd25519Key = async () => {
    try {
      // Ed25519 support varies by browser
      const keyPairObj = await crypto.subtle.generateKey(
        {
          name: 'Ed25519',
        } as any,
        true,
        ['sign', 'verify']
      )

      const publicKey = await crypto.subtle.exportKey(
        'spki',
        keyPairObj.publicKey
      )
      const privateKey = await crypto.subtle.exportKey(
        'pkcs8',
        keyPairObj.privateKey
      )

      const publicKeyPem = arrayBufferToPem(publicKey, 'PUBLIC KEY')
      let privateKeyPem = arrayBufferToPem(privateKey, 'PRIVATE KEY')

      if (usePassword && password) {
        privateKeyPem = await encryptPrivateKey(privateKeyPem, password)
      }

      const fingerprint = await generateFingerprint(publicKey)

      const commentSuffix = comment ? ` ${comment}` : ''
      const publicKeyWithComment = `${publicKeyPem}${commentSuffix}`

      return {
        publicKey: publicKeyWithComment,
        privateKey: privateKeyPem,
        fingerprint,
      }
    } catch (err) {
      throw new Error(
        'Ed25519 is not supported in your browser. Try using ECDSA P-256 instead.'
      )
    }
  }

  const generateKeyPair = async () => {
    setGenerating(true)
    setError('')
    setKeyPair(null)

    try {
      let result
      switch (keyType) {
        case 'RSA':
          result = await generateRSAKey()
          break
        case 'ECDSA':
          result = await generateECDSAKey()
          break
        case 'Ed25519':
          result = await generateEd25519Key()
          break
        default:
          throw new Error('Unsupported key type')
      }

      setKeyPair(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = async (text: string, type: 'public' | 'private') => {
    await navigator.clipboard.writeText(text)
    if (type === 'public') {
      setCopiedPublic(true)
      setTimeout(() => setCopiedPublic(false), 2000)
    } else {
      setCopiedPrivate(true)
      setTimeout(() => setCopiedPrivate(false), 2000)
    }
  }

  const downloadKey = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolCard
      title='SSH Key Generator'
      description='Generate RSA, ECDSA, or Ed25519 key pairs with optional password protection.'
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Key Type</label>
          <select
            value={keyType}
            onChange={(e) => setKeyType(e.target.value as KeyType)}
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
          >
            <option value='RSA'>RSA</option>
            <option value='ECDSA'>ECDSA (Elliptic Curve)</option>
            <option value='Ed25519'>Ed25519 (Modern)</option>
          </select>
        </div>

        {keyType === 'RSA' && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Key Size</label>
            <select
              value={rsaKeySize}
              onChange={(e) => setRsaKeySize(e.target.value as RSAKeySize)}
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            >
              <option value='2048'>2048 bits</option>
              <option value='3072'>3072 bits</option>
              <option value='4096'>4096 bits (most secure)</option>
            </select>
          </div>
        )}

        {keyType === 'ECDSA' && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Curve</label>
            <select
              value={ecdsaCurve}
              onChange={(e) => setEcdsaCurve(e.target.value as ECDSACurve)}
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            >
              <option value='P-256'>P-256 (256-bit)</option>
              <option value='P-384'>P-384 (384-bit)</option>
              <option value='P-521'>P-521 (521-bit)</option>
            </select>
          </div>
        )}

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Comment (Optional)</label>
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='e.g., user@hostname'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
          />
        </div>

        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-sm text-neutral-300'>
            <input
              type='checkbox'
              checked={usePassword}
              onChange={(e) => setUsePassword(e.target.checked)}
              className='w-4 h-4'
            />
            Password Protect Private Key
          </label>
          {usePassword && (
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password for encryption...'
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            />
          )}
        </div>

        <button
          onClick={generateKeyPair}
          disabled={generating || (usePassword && !password)}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {generating ? 'Generating...' : 'Generate Key Pair'}
        </button>

        {error && (
          <div className='px-3 py-2 bg-red-900/20 border border-red-800 text-red-400 text-sm'>
            {error}
          </div>
        )}

        {keyPair && (
          <div className='space-y-4'>
            {keyPair.fingerprint && (
              <div className='px-3 py-2 bg-blue-900/20 border border-blue-800 text-blue-400 text-xs font-mono'>
                <strong>Fingerprint:</strong> {keyPair.fingerprint}
              </div>
            )}

            <div className='space-y-2'>
              <label className='text-sm text-neutral-400 block'>
                Public Key
              </label>
              <textarea
                value={keyPair.publicKey}
                readOnly
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs min-h-[120px] resize-y'
              />
              <div className='flex gap-2'>
                <button
                  onClick={() => copyToClipboard(keyPair.publicKey, 'public')}
                  disabled={copiedPublic}
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm disabled:opacity-50'
                >
                  {copiedPublic ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() =>
                    downloadKey(
                      keyPair.publicKey,
                      keyType === 'Ed25519'
                        ? 'id_ed25519.pub'
                        : keyType === 'ECDSA'
                          ? 'id_ecdsa.pub'
                          : 'id_rsa.pub'
                    )
                  }
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm'
                >
                  Download
                </button>
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-neutral-400 block'>
                Private Key {usePassword && '(Encrypted)'}
              </label>
              <textarea
                value={keyPair.privateKey}
                readOnly
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs min-h-[200px] resize-y'
              />
              <div className='flex gap-2'>
                <button
                  onClick={() => copyToClipboard(keyPair.privateKey, 'private')}
                  disabled={copiedPrivate}
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm disabled:opacity-50'
                >
                  {copiedPrivate ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() =>
                    downloadKey(
                      keyPair.privateKey,
                      keyType === 'Ed25519'
                        ? 'id_ed25519'
                        : keyType === 'ECDSA'
                          ? 'id_ecdsa'
                          : 'id_rsa'
                    )
                  }
                  className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm'
                >
                  Download
                </button>
              </div>
              <p className='text-xs text-red-400'>
                Keep your private key secure! Never share it.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default SshKeyGenerator
