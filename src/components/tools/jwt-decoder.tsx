'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const JwtDecoder = () => {
  const [input, setInput] = useState('')
  const [decoded, setDecoded] = useState<{
    header: string
    payload: string
    signature: string
  } | null>(null)
  const [error, setError] = useState('')

  const decodeJwt = () => {
    setError('')
    setDecoded(null)

    if (!input) return

    try {
      const parts = input.split('.')
      if (parts.length !== 3) {
        setError('Invalid JWT format. Expected 3 parts separated by dots.')
        return
      }

      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))

      setDecoded({
        header: JSON.stringify(header, null, 2),
        payload: JSON.stringify(payload, null, 2),
        signature: parts[2],
      })
    } catch (err) {
      setError('Failed to decode JWT: ' + (err as Error).message)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <ToolCard
      title='JWT Decoder'
      description='Decode and inspect JSON Web Tokens (JWT).'
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>JWT Token</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JWT token here...'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[100px] resize-y'
          />
        </div>

        <button
          onClick={decodeJwt}
          disabled={!input}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Decode JWT
        </button>

        {error && (
          <div className='px-3 py-2 bg-red-900/20 border border-red-800 text-red-400 text-sm'>
            {error}
          </div>
        )}

        {decoded && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm text-neutral-400 block'>Header</label>
              <textarea
                value={decoded.header}
                readOnly
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[80px] resize-y'
              />
              <button
                onClick={() => copyToClipboard(decoded.header)}
                className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm'
              >
                Copy
              </button>
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-neutral-400 block'>Payload</label>
              <textarea
                value={decoded.payload}
                readOnly
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[120px] resize-y'
              />
              <button
                onClick={() => copyToClipboard(decoded.payload)}
                className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm'
              >
                Copy
              </button>
            </div>

            <div className='space-y-2'>
              <label className='text-sm text-neutral-400 block'>
                Signature
              </label>
              <input
                type='text'
                value={decoded.signature}
                readOnly
                className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
              />
              <button
                onClick={() => copyToClipboard(decoded.signature)}
                className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-sm'
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default JwtDecoder
