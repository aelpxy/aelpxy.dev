'use client'

import { encryptText, validateSecurityEnvironment } from '@/lib/crypto'
import { client } from '@/server/rpc'
import {
  AlertTriangle,
  Copy,
  Eye,
  EyeOff,
  Link,
  Loader2,
  Lock,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleShare = async () => {
    if (!text.trim()) {
      setError('Please enter some text to share')
      return
    }

    if (!password.trim()) {
      setError('Please enter a password')
      return
    }

    if (password.length < 12) {
      setError('Password must be at least 12 characters for security')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      validateSecurityEnvironment()

      const encrypted = await encryptText(text, password)

      const result = await client.shares.create({
        encryptedContent: encrypted.encryptedContent,
        salt: encrypted.salt,
        iv: encrypted.iv,
        keyHash: encrypted.keyHash,
        authTag: encrypted.authTag,
        version: encrypted.version,
      })

      const link = `${window.location.origin}/share/${result.id}`
      setShareLink(link)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create share')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const createNewShare = () => {
    setText('')
    setPassword('')
    setShareLink('')
    setError('')
  }

  if (shareLink) {
    return (
      <div className='mx-auto max-w-2xl py-8'>
        <div className='p-6'>
          <div className='mb-4'>
            <h1 className='flex items-center gap-2 text-xl font-medium text-neutral-50'>
              <Link className='h-5 w-5' />
              Saved Successfully
            </h1>
            <p className='mt-4 text-neutral-300'>
              Your encrypted text has been saved. Share this link with anyone
              you want to give access to.
            </p>
          </div>

          <div className='space-y-4'>
            <div>
              <label
                htmlFor='share-link'
                className='block text-sm font-medium text-neutral-200'
              >
                Share Link
              </label>
              <div className='mt-1 flex gap-2'>
                <input
                  id='share-link'
                  value={shareLink}
                  readOnly
                  className='flex-1 border border-neutral-700 bg-neutral-800 px-3 py-2 font-mono text-sm text-neutral-100 focus:border-neutral-600 focus:outline-none'
                />
                <button
                  onClick={copyToClipboard}
                  className='flex items-center gap-2 border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700 transition-colors'
                >
                  <Copy className='h-4 w-4' />
                  Copy
                </button>
              </div>
            </div>

            <div className='border border-neutral-700 bg-neutral-800 p-4'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <Lock className='h-5 w-5 text-neutral-400' />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-neutral-200'>
                    Important
                  </h3>
                  <div className='mt-2 text-sm text-neutral-400'>
                    Make sure to share the password separately and securely.
                    Without the password, the content cannot be decrypted.
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-2'>
              <button
                onClick={createNewShare}
                className='flex-1 border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-700 transition-colors'
              >
                Create Another Share
              </button>
              <button
                onClick={() => router.push('/')}
                className='flex-1 border border-neutral-600 bg-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-600 transition-colors'
              >
                Go Home
              </button>
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
            Share securely
          </h1>
          <p className='mt-4 text-neutral-300'>
            Only those with the password can decrypt and view the content. This
            can be used to securely share your environment variables.
          </p>
        </div>

        <div className='space-y-4'>
          <div>
            <label
              htmlFor='text'
              className='block text-sm font-medium text-neutral-200'
            >
              Text
            </label>
            <textarea
              id='text'
              placeholder='Enter the text you want to share securely...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className='mt-1 block w-full border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 placeholder-neutral-400 focus:border-neutral-600 focus:outline-none'
            />
          </div>

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
                placeholder='Enter a strong password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block w-full border border-neutral-700 bg-neutral-800 px-3 py-2 pr-10 text-neutral-100 placeholder-neutral-400 focus:border-neutral-600 focus:outline-none'
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
            <p className='mt-1 text-sm text-neutral-400'>
              Use a strong password. This will be required to decrypt the
              content.
            </p>
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
            onClick={handleShare}
            disabled={isLoading || !text.trim() || !password.trim()}
            className='w-full flex items-center justify-center gap-2 border border-neutral-600 bg-neutral-700 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-neutral-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors'
          >
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Mutating your text...
              </>
            ) : (
              <>
                <Lock className='h-4 w-4' />
                Encrypt & Create
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
