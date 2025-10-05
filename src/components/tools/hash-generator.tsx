'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

const HashGenerator = () => {
  const [input, setInput] = useState('')
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256')
  const [hash, setHash] = useState('')
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generateHash = async () => {
    setGenerating(true)
    if (!input) return

    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashHex = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    setHash(hashHex)
    setGenerating(false)
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolCard
      title='Hash Generator'
      description='Generate cryptographic hashes from text.'
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Hash Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
          >
            <option value='SHA-1'>SHA-1</option>
            <option value='SHA-256'>SHA-256</option>
            <option value='SHA-384'>SHA-384</option>
            <option value='SHA-512'>SHA-512</option>
          </select>
        </div>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter text to hash...'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 min-h-[100px] resize-y'
          />
        </div>
        <button
          onClick={generateHash}
          disabled={!input || generating}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {generating ? 'Generating...' : 'Generate Hash'}
        </button>
        {hash && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400 block mb-1'>
              {algorithm} Hash
            </label>
            <div className='flex gap-2'>
              <input
                type='text'
                value={hash}
                readOnly
                className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
              />
              <button
                onClick={() => copyToClipboard(hash)}
                disabled={copied}
                className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default HashGenerator
