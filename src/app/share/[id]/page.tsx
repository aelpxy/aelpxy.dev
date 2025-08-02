'use client'

import { decryptText, validateSecurityEnvironment } from '@/lib/crypto'
import { client } from '@/server/rpc'
import {
  AlertTriangle,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Unlock,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const params = useParams()
  const shareId = params.id as string

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [decryptedText, setDecryptedText] = useState('')
  const [error, setError] = useState('')
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [share, setShare] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchShare = async () => {
      try {
        const shareData = await client.shares.get({ id: shareId })
        setShare(shareData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Share not found')
      } finally {
        setIsLoading(false)
      }
    }

    if (shareId) {
      fetchShare()
    }
  }, [shareId])

  const handleDecrypt = async () => {
    if (!password.trim()) {
      setError('Please enter the password')
      return
    }

    if (!share) {
      setError('Share data not available')
      return
    }

    setIsDecrypting(true)
    setError('')

    try {
      validateSecurityEnvironment()

      const decrypted = await decryptText({
        encryptedContent: share.encryptedContent,
        salt: share.salt,
        iv: share.iv,
        keyHash: share.keyHash,
        authTag: share.authTag,
        version: share.version,
        password: password,
      })

      setDecryptedText(decrypted)
    } catch (err) {
      setError('Failed to decrypt. Please check your password and try again.')
    } finally {
      setIsDecrypting(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(decryptedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const resetView = () => {
    setDecryptedText('')
    setPassword('')
    setError('')
  }

  if (isLoading) {
    return (
      <div className='mx-auto max-w-2xl py-8'>
        <div className='p-6'>
          <div className='animate-pulse'>
            <div className='h-6 bg-neutral-700 w-48 mb-2'></div>
            <div className='h-4 bg-neutral-700 w-64 mb-4'></div>
            <div className='h-4 bg-neutral-700 w-24 mb-2'></div>
            <div className='h-10 bg-neutral-700 w-full mb-4'></div>
            <div className='h-10 bg-neutral-700 w-full'></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !share) {
    return (
      <div className='mx-auto max-w-2xl py-8'>
        <div className='p-6'>
          <div className='mb-4'>
            <h1 className='flex items-center gap-2 text-xl font-medium text-neutral-50'>
              <AlertTriangle className='h-5 w-5' />
              Share Not Found
            </h1>
            <p className='mt-4 text-neutral-300'>
              This share does not exist or has expired.
            </p>
          </div>

          <div className='border border-neutral-600 bg-neutral-800 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <AlertTriangle className='h-5 w-5 text-neutral-400' />
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-neutral-200'>Error</h3>
                <div className='mt-2 text-sm text-neutral-400'>{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (decryptedText) {
    return (
      <div className='mx-auto max-w-2xl py-8'>
        <div className=' p-6'>
          <div className='mb-4'>
            <h1 className='flex items-center gap-2 text-xl font-medium text-neutral-50'>
              <Unlock className='h-5 w-5' />
              Decrypted Successfully
            </h1>
            <p className='mt-4 text-neutral-300'>
              Your content has been decrypted and is ready to view.
            </p>
          </div>

          <div className='mt-4 space-y-4'>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='decrypted-content'
                  className='block text-sm font-medium text-neutral-200'
                >
                  Content
                </label>
                <button
                  onClick={copyToClipboard}
                  className='flex items-center gap-2 border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm font-medium text-neutral-200 hover:bg-neutral-700 transition-colors'
                >
                  {copied ? (
                    <>
                      <CheckCircle className='h-4 w-4' />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className='h-4 w-4' />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <textarea
                id='decrypted-content'
                value={decryptedText}
                readOnly
                rows={Math.min(
                  Math.max(decryptedText.split('\n').length, 6),
                  15
                )}
                className='mt-1 block w-full border border-neutral-700 bg-neutral-800 px-3 py-2 font-mono text-sm text-neutral-100'
              />
            </div>

            <div className='border border-neutral-700 bg-neutral-800 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <Lock className='h-5 w-5 text-neutral-400' />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-neutral-200'>Note</h3>
                  <div className='mt-2 text-sm text-neutral-400'>
                    This content was decrypted locally in your browser. Your
                    secrets are safe.
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-2'>
              <button
                onClick={resetView}
                className='flex-1 border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700 transition-colors'
              >
                Refresh
              </button>
              <button
                onClick={() => (window.location.href = '/share')}
                className='flex-1 border border-neutral-600 bg-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-600 transition-colors'
              >
                Create New Share
              </button>
            </div>

            <div className='border-t border-neutral-700 pt-4 text-sm text-neutral-400'>
              <p>Share created: {new Date(share.createdAt).toLocaleString()}</p>
              {share.expiresAt && (
                <p>Expires: {new Date(share.expiresAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-2xl py-8'>
      <div className=' p-6'>
        <div className='mb-4'>
          <h1 className='flex items-center gap-2 text-xl font-medium text-neutral-50'>
            <Lock className='h-5 w-5' />
            Decrypt Share
          </h1>
          <p className='mt-4 text-neutral-300'>
            Enter the password to decrypt and view the shared content.
          </p>
        </div>

        <div className='space-y-4'>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-neutral-200'
            >
              Password
            </label>
            <div className='relative mt-1'>
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter the password to decrypt...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleDecrypt()
                  }
                }}
                className='block w-full border border-neutral-700 bg-neutral-800 px-3 py-2 pr-10 text-neutral-100 placeholder-neutral-400 focus:border-neutral-600 focus:outline-none'
                autoFocus
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-300'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className='border border-neutral-600 bg-neutral-800 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <AlertTriangle className='h-5 w-5 text-neutral-400' />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-neutral-200'>
                    Error
                  </h3>
                  <div className='mt-2 text-sm text-neutral-400'>{error}</div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleDecrypt}
            disabled={isDecrypting || !password.trim()}
            className='w-full flex items-center justify-center gap-2 border border-neutral-600 bg-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors'
          >
            {isDecrypting ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Decrypting...
              </>
            ) : (
              <>
                <Unlock className='h-4 w-4' />
                Decrypt Content
              </>
            )}
          </button>

          <div className='border-t border-neutral-700 pt-4 text-sm text-neutral-400'>
            <p>Share created: {new Date(share.createdAt).toLocaleString()}</p>
            {share.expiresAt && (
              <p>Expires: {new Date(share.expiresAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
