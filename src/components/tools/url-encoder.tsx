'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const UrlEncoder = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        const encoded = encodeURIComponent(input)
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(input)
        setOutput(decoded)
      }
    } catch (error) {
      setOutput('Error: Invalid input for decoding')
    }
  }

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
    }
  }

  return (
    <ToolCard
      title='URL Encoder/Decoder'
      description='Encode or decode URL components.'
    >
      <div className='space-y-4'>
        <div className='flex gap-2'>
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 border transition-colors ${
              mode === 'encode'
                ? 'bg-neutral-700 border-neutral-600 text-neutral-100'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 border transition-colors ${
              mode === 'decode'
                ? 'bg-neutral-700 border-neutral-600 text-neutral-100'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            Decode
          </button>
        </div>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>
            {mode === 'encode' ? 'Plain URL' : 'Encoded URL'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Enter URL to encode...'
                : 'Enter encoded URL to decode...'
            }
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 min-h-[100px] resize-y'
          />
        </div>
        <button
          onClick={handleConvert}
          disabled={!input}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        {output && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>
              {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
            </label>
            <textarea
              value={output}
              readOnly
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[100px] resize-y'
            />
            <button
              onClick={copyToClipboard}
              className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default UrlEncoder
