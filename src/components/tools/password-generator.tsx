'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const PasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generatePassword = () => {
    setGenerating(true)
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let charset = ''
    if (includeUppercase) charset += uppercase
    if (includeLowercase) charset += lowercase
    if (includeNumbers) charset += numbers
    if (includeSymbols) charset += symbols

    if (!charset) return

    let result = ''
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)

    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length]
    }

    setPassword(result)
    setTimeout(() => setGenerating(false), 200)
  }

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <ToolCard
      title='Password Generator'
      description='Generate secure random passwords with custom options.'
    >
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Length: {length}</label>
          <input
            type='range'
            min='8'
            max='128'
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className='w-full'
          />
        </div>

        <div className='space-y-2'>
          <label className='flex items-center gap-2 text-sm text-neutral-300'>
            <input
              type='checkbox'
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className='w-4 h-4'
            />
            Include Uppercase (A-Z)
          </label>
          <label className='flex items-center gap-2 text-sm text-neutral-300'>
            <input
              type='checkbox'
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className='w-4 h-4'
            />
            Include Lowercase (a-z)
          </label>
          <label className='flex items-center gap-2 text-sm text-neutral-300'>
            <input
              type='checkbox'
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className='w-4 h-4'
            />
            Include Numbers (0-9)
          </label>
          <label className='flex items-center gap-2 text-sm text-neutral-300'>
            <input
              type='checkbox'
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className='w-4 h-4'
            />
            Include Symbols (!@#$...)
          </label>
        </div>

        <button
          onClick={generatePassword}
          disabled={generating}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50'
        >
          {generating ? 'Generating...' : 'Generate Password'}
        </button>

        {password && (
          <div className='space-y-2'>
            <div className='flex gap-2'>
              <input
                type='text'
                value={password}
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
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default PasswordGenerator
