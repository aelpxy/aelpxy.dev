'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const JsonFormatter = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [processing, setProcessing] = useState(false)

  const formatJson = () => {
    setError('')
    setProcessing(true)
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    } finally {
      setProcessing(false)
    }
  }

  const minifyJson = () => {
    setError('')
    setProcessing(true)
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    } finally {
      setProcessing(false)
    }
  }

  const copyToClipboard = async () => {
    if (output) {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <ToolCard
      title='JSON Formatter'
      description='Format, minify, and validate JSON data.'
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON...'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[150px] resize-y'
          />
        </div>
        <div className='flex gap-2'>
          <button
            onClick={formatJson}
            disabled={!input || processing}
            className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {processing ? 'Formatting...' : 'Format'}
          </button>
          <button
            onClick={minifyJson}
            disabled={!input || processing}
            className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {processing ? 'Minifying...' : 'Minify'}
          </button>
        </div>
        {error && (
          <div className='px-3 py-2 bg-red-900/20 border border-red-800 text-red-400 text-sm'>
            {error}
          </div>
        )}
        {output && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Output</label>
            <textarea
              value={output}
              readOnly
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[150px] resize-y'
            />
            <button
              onClick={copyToClipboard}
              disabled={copied}
              className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default JsonFormatter
