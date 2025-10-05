'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

type EncryptionMode = 'AES-GCM' | 'AES-CBC' | 'AES-CTR'
type KeyLength = 128 | 192 | 256

const AesEncryption = () => {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [algorithm, setAlgorithm] = useState<EncryptionMode>('AES-GCM')
  const [keyLength, setKeyLength] = useState<KeyLength>(256)
  const [input, setInput] = useState('')
  const [password, setPassword] = useState('')
  const [customIv, setCustomIv] = useState('')
  const [useCustomIv, setUseCustomIv] = useState(false)
  const [customSalt, setCustomSalt] = useState('')
  const [useCustomSalt, setUseCustomSalt] = useState(false)
  const [iterations, setIterations] = useState(100000)
  const [tagLength, setTagLength] = useState(128)
  const [aad, setAad] = useState('')
  const [output, setOutput] = useState('')
  const [generatedIv, setGeneratedIv] = useState('')
  const [generatedSalt, setGeneratedSalt] = useState('')
  const [error, setError] = useState('')
  const [copiedOutput, setCopiedOutput] = useState(false)
  const [copiedSalt, setCopiedSalt] = useState(false)
  const [copiedIv, setCopiedIv] = useState(false)
  const [processing, setProcessing] = useState(false)

  const hexToBytes = (hex: string): Uint8Array => {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
    }
    return bytes
  }

  const bytesToHex = (bytes: Uint8Array): string => {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const deriveKey = async (password: string, salt: Uint8Array) => {
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    )

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: algorithm, length: keyLength },
      false,
      ['encrypt', 'decrypt']
    )
  }

  const getIvLength = () => {
    if (algorithm === 'AES-GCM') return 12
    if (algorithm === 'AES-CBC') return 16
    if (algorithm === 'AES-CTR') return 16
    return 12
  }

  const encrypt = async () => {
    setError('')
    setOutput('')
    setGeneratedIv('')
    setGeneratedSalt('')
    setProcessing(true)

    if (!input || !password) {
      setError('Please provide both input and password')
      setProcessing(false)
      return
    }

    try {
      const encoder = new TextEncoder()

      // Handle salt
      let salt: Uint8Array
      if (useCustomSalt && customSalt) {
        salt = hexToBytes(customSalt)
        if (salt.length !== 16) {
          setError('Custom salt must be 16 bytes (32 hex characters)')
          return
        }
      } else {
        salt = crypto.getRandomValues(new Uint8Array(16))
      }

      // Handle IV
      let ivBuffer: Uint8Array
      const ivLength = getIvLength()
      if (useCustomIv && customIv) {
        ivBuffer = hexToBytes(customIv)
        if (ivBuffer.length !== ivLength) {
          setError(
            `Custom IV must be ${ivLength} bytes (${ivLength * 2} hex characters) for ${algorithm}`
          )
          return
        }
      } else {
        ivBuffer = crypto.getRandomValues(new Uint8Array(ivLength))
      }

      const key = await deriveKey(password, salt)

      let encryptParams: any = {
        name: algorithm,
        iv: ivBuffer,
      }

      if (algorithm === 'AES-GCM') {
        encryptParams.tagLength = tagLength
        if (aad) {
          encryptParams.additionalData = encoder.encode(aad)
        }
      }

      if (algorithm === 'AES-CTR') {
        encryptParams.counter = ivBuffer
        encryptParams.length = 64
      }

      const encrypted = await crypto.subtle.encrypt(
        encryptParams,
        key,
        encoder.encode(input)
      )

      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(
        salt.length + ivBuffer.length + encrypted.byteLength
      )
      combined.set(salt, 0)
      combined.set(ivBuffer, salt.length)
      combined.set(new Uint8Array(encrypted), salt.length + ivBuffer.length)

      const encryptedBase64 = btoa(
        String.fromCharCode(...new Uint8Array(combined))
      )

      setOutput(encryptedBase64)
      setGeneratedIv(bytesToHex(ivBuffer))
      setGeneratedSalt(bytesToHex(salt))
    } catch (err) {
      setError('Encryption failed: ' + (err as Error).message)
    } finally {
      setProcessing(false)
    }
  }

  const decrypt = async () => {
    setError('')
    setOutput('')
    setGeneratedIv('')
    setGeneratedSalt('')
    setProcessing(true)

    if (!input || !password) {
      setError('Please provide both encrypted text and password')
      setProcessing(false)
      return
    }

    try {
      // Decode the combined data
      const combined = new Uint8Array(
        atob(input)
          .split('')
          .map((c) => c.charCodeAt(0))
      )

      const ivLength = getIvLength()

      // Extract salt, iv, and encrypted data
      const salt = combined.slice(0, 16)
      const ivBuffer = combined.slice(16, 16 + ivLength)
      const encryptedData = combined.slice(16 + ivLength)

      const key = await deriveKey(password, salt)

      let decryptParams: any = {
        name: algorithm,
        iv: ivBuffer,
      }

      if (algorithm === 'AES-GCM') {
        decryptParams.tagLength = tagLength
        if (aad) {
          const encoder = new TextEncoder()
          decryptParams.additionalData = encoder.encode(aad)
        }
      }

      if (algorithm === 'AES-CTR') {
        decryptParams.counter = ivBuffer
        decryptParams.length = 64
      }

      const decrypted = await crypto.subtle.decrypt(
        decryptParams,
        key,
        encryptedData
      )

      const decoder = new TextDecoder()
      const decryptedText = decoder.decode(decrypted)

      setOutput(decryptedText)
      setGeneratedIv(bytesToHex(ivBuffer))
      setGeneratedSalt(bytesToHex(salt))
    } catch (err) {
      setError('Decryption failed: ' + (err as Error).message)
    } finally {
      setProcessing(false)
    }
  }

  const handleProcess = () => {
    if (mode === 'encrypt') {
      encrypt()
    } else {
      decrypt()
    }
  }

  const copyToClipboard = async (
    text: string,
    type: 'output' | 'salt' | 'iv'
  ) => {
    await navigator.clipboard.writeText(text)
    if (type === 'output') {
      setCopiedOutput(true)
      setTimeout(() => setCopiedOutput(false), 2000)
    } else if (type === 'salt') {
      setCopiedSalt(true)
      setTimeout(() => setCopiedSalt(false), 2000)
    } else {
      setCopiedIv(true)
      setTimeout(() => setCopiedIv(false), 2000)
    }
  }

  return (
    <ToolCard
      title='AES Encryption/Decryption'
      description='Advanced AES encryption with customizable parameters.'
    >
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-2'>
          <button
            onClick={() => setMode('encrypt')}
            className={`px-4 py-2 border transition-colors ${
              mode === 'encrypt'
                ? 'bg-neutral-700 border-neutral-600 text-neutral-100'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Encrypt
          </button>
          <button
            onClick={() => setMode('decrypt')}
            className={`px-4 py-2 border transition-colors ${
              mode === 'decrypt'
                ? 'bg-neutral-700 border-neutral-600 text-neutral-100'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Decrypt
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as EncryptionMode)}
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            >
              <option value='AES-GCM'>AES-GCM (Authenticated)</option>
              <option value='AES-CBC'>AES-CBC</option>
              <option value='AES-CTR'>AES-CTR</option>
            </select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Key Length</label>
            <select
              value={keyLength}
              onChange={(e) =>
                setKeyLength(parseInt(e.target.value) as KeyLength)
              }
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            >
              <option value='128'>128 bits</option>
              <option value='192'>192 bits</option>
              <option value='256'>256 bits</option>
            </select>
          </div>
        </div>

        {algorithm === 'AES-GCM' && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm text-neutral-400'>Tag Length</label>
              <select
                value={tagLength}
                onChange={(e) => setTagLength(parseInt(e.target.value))}
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
              >
                <option value='32'>32 bits</option>
                <option value='64'>64 bits</option>
                <option value='96'>96 bits</option>
                <option value='104'>104 bits</option>
                <option value='112'>112 bits</option>
                <option value='120'>120 bits</option>
                <option value='128'>128 bits</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-neutral-400'>
                AAD (Additional Authenticated Data)
              </label>
              <input
                type='text'
                value={aad}
                onChange={(e) => setAad(e.target.value)}
                placeholder='Optional...'
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
              />
            </div>
          </div>
        )}

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>PBKDF2 Iterations</label>
          <input
            type='number'
            value={iterations}
            onChange={(e) => setIterations(parseInt(e.target.value))}
            min='1000'
            max='1000000'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter encryption password...'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
          />
        </div>

        {mode === 'encrypt' && (
          <>
            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-sm text-neutral-300'>
                <input
                  type='checkbox'
                  checked={useCustomIv}
                  onChange={(e) => setUseCustomIv(e.target.checked)}
                  className='w-4 h-4'
                />
                Use Custom IV (Initialization Vector)
              </label>
              {useCustomIv && (
                <input
                  type='text'
                  value={customIv}
                  onChange={(e) => setCustomIv(e.target.value)}
                  placeholder={`Hex string (${getIvLength() * 2} characters)`}
                  className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                />
              )}
            </div>

            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-sm text-neutral-300'>
                <input
                  type='checkbox'
                  checked={useCustomSalt}
                  onChange={(e) => setUseCustomSalt(e.target.checked)}
                  className='w-4 h-4'
                />
                Use Custom Salt
              </label>
              {useCustomSalt && (
                <input
                  type='text'
                  value={customSalt}
                  onChange={(e) => setCustomSalt(e.target.value)}
                  placeholder='Hex string (32 characters)'
                  className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                />
              )}
            </div>
          </>
        )}

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>
            {mode === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encrypt'
                ? 'Enter text to encrypt...'
                : 'Enter encrypted text (Base64)...'
            }
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 min-h-[100px] resize-y font-mono text-sm'
          />
        </div>

        <button
          onClick={handleProcess}
          disabled={!input || !password || processing}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {processing
            ? mode === 'encrypt'
              ? 'Encrypting...'
              : 'Decrypting...'
            : mode === 'encrypt'
              ? 'Encrypt'
              : 'Decrypt'}
        </button>

        {error && (
          <div className='px-3 py-2 bg-red-900/20 border border-red-800 text-red-400 text-sm'>
            {error}
          </div>
        )}

        {output && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm text-neutral-400'>
                {mode === 'encrypt'
                  ? 'Encrypted Text (Base64)'
                  : 'Decrypted Text'}
              </label>
              <textarea
                value={output}
                readOnly
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[100px] resize-y'
              />
              <button
                onClick={() => copyToClipboard(output, 'output')}
                disabled={copiedOutput}
                className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
              >
                {copiedOutput ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {generatedSalt && (
              <div className='space-y-2'>
                <label className='text-sm text-neutral-400'>Salt (Hex)</label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={generatedSalt}
                    readOnly
                    className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                  />
                  <button
                    onClick={() => copyToClipboard(generatedSalt, 'salt')}
                    disabled={copiedSalt}
                    className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
                  >
                    {copiedSalt ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            {generatedIv && (
              <div className='space-y-2'>
                <label className='text-sm text-neutral-400'>
                  IV - Initialization Vector (Hex)
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={generatedIv}
                    readOnly
                    className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
                  />
                  <button
                    onClick={() => copyToClipboard(generatedIv, 'iv')}
                    disabled={copiedIv}
                    className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
                  >
                    {copiedIv ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}

            <div className='px-3 py-2 bg-blue-900/20 border border-blue-800 text-blue-400 text-xs space-y-1'>
              <p>
                <strong>Algorithm:</strong> {algorithm}
              </p>
              <p>
                <strong>Key Length:</strong> {keyLength} bits
              </p>
              <p>
                <strong>PBKDF2 Iterations:</strong>{' '}
                {iterations.toLocaleString()}
              </p>
              {algorithm === 'AES-GCM' && (
                <p>
                  <strong>Tag Length:</strong> {tagLength} bits
                </p>
              )}
              <p className='pt-1 border-t border-blue-700 mt-2'>
                The encrypted output includes salt + IV + ciphertext combined.
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default AesEncryption
