'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const UuidGenerator = () => {
  const [uuid, setUuid] = useState('')
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generateUuid = () => {
    setGenerating(true)
    const uuid = crypto.randomUUID()
    setUuid(uuid)
    setTimeout(() => setGenerating(false), 200)
  }

  const copyToClipboard = async () => {
    if (uuid) {
      await navigator.clipboard.writeText(uuid)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <ToolCard
      title='UUID Generator'
      description='Generate random UUIDs (v4) for your applications.'
    >
      <div className='space-y-4'>
        <button
          onClick={generateUuid}
          disabled={generating}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
        >
          {generating ? 'Generating...' : 'Generate UUID'}
        </button>
        {uuid && (
          <div className='flex gap-2'>
            <input
              type='text'
              value={uuid}
              readOnly
              className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm'
            />
            <button
              onClick={copyToClipboard}
              disabled={copied}
              className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default UuidGenerator
