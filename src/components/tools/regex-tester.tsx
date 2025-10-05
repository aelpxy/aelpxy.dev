'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const RegexTester = () => {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState('')

  const testRegex = () => {
    setError('')
    setMatches([])

    if (!pattern) return

    try {
      const regex = new RegExp(pattern, flags)
      const foundMatches = testString.match(regex)

      if (foundMatches) {
        setMatches(foundMatches)
      } else {
        setMatches([])
      }
    } catch (err) {
      setError('Invalid regex pattern: ' + (err as Error).message)
    }
  }

  return (
    <ToolCard
      title='Regex Tester'
      description='Test regular expressions and see matches in real-time.'
    >
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2 space-y-2'>
            <label className='text-sm text-neutral-400'>Pattern</label>
            <input
              type='text'
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder='^\d{3}-\d{3}-\d{4}$'
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Flags</label>
            <input
              type='text'
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder='g, i, m'
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder='Enter text to test against the pattern...'
            className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 min-h-[120px] resize-y'
          />
        </div>

        <button
          onClick={testRegex}
          disabled={!pattern}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Test
        </button>

        {error && (
          <div className='px-3 py-2 bg-red-900/20 border border-red-800 text-red-400 text-sm'>
            {error}
          </div>
        )}

        {matches.length > 0 && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>
              Matches ({matches.length})
            </label>
            <div className='p-3 bg-neutral-900 border border-neutral-700 rounded space-y-2'>
              {matches.map((match, index) => (
                <div
                  key={index}
                  className='px-2 py-1 bg-neutral-800 border border-neutral-700 font-mono text-sm text-green-400'
                >
                  {match}
                </div>
              ))}
            </div>
          </div>
        )}

        {!error && matches.length === 0 && pattern && testString && (
          <div className='px-3 py-2 bg-yellow-900/20 border border-yellow-800 text-yellow-400 text-sm'>
            No matches found
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default RegexTester
