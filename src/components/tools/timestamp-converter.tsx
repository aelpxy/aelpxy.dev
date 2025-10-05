'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState('')
  const [humanReadable, setHumanReadable] = useState('')
  const [currentTime, setCurrentTime] = useState(Date.now())

  const convertToHuman = () => {
    if (!timestamp) return

    try {
      const ts = parseInt(timestamp)
      const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts)
      setHumanReadable(date.toISOString())
    } catch (err) {
      setHumanReadable('Invalid timestamp')
    }
  }

  const convertToTimestamp = () => {
    if (!humanReadable) return

    try {
      const date = new Date(humanReadable)
      setTimestamp(Math.floor(date.getTime() / 1000).toString())
    } catch (err) {
      setTimestamp('Invalid date')
    }
  }

  const getCurrentTimestamp = () => {
    const now = Date.now()
    setCurrentTime(now)
    setTimestamp(Math.floor(now / 1000).toString())
    setHumanReadable(new Date(now).toISOString())
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <ToolCard
      title='Timestamp Converter'
      description='Convert between Unix timestamps and human-readable dates.'
    >
      <div className='space-y-4'>
        <button
          onClick={getCurrentTimestamp}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
        >
          Get Current Timestamp
        </button>

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>Unix Timestamp</label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder='1234567890'
              className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            />
            <button
              onClick={convertToHuman}
              className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
            >
              Convert
            </button>
          </div>
        </div>

        <div className='space-y-2'>
          <label className='text-sm text-neutral-400'>
            Human Readable (ISO 8601)
          </label>
          <div className='flex gap-2'>
            <input
              type='text'
              value={humanReadable}
              onChange={(e) => setHumanReadable(e.target.value)}
              placeholder='2023-01-01T00:00:00.000Z'
              className='flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300'
            />
            <button
              onClick={convertToTimestamp}
              className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors'
            >
              Convert
            </button>
          </div>
        </div>

        {timestamp && humanReadable && (
          <div className='space-y-2'>
            <div className='p-3 bg-neutral-900 border border-neutral-700 rounded'>
              <p className='text-xs text-neutral-400 mb-1'>Unix Timestamp</p>
              <div className='flex justify-between items-center'>
                <code className='text-sm text-neutral-200'>{timestamp}</code>
                <button
                  onClick={() => copyToClipboard(timestamp)}
                  className='px-3 py-1 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-xs'
                >
                  Copy
                </button>
              </div>
            </div>
            <div className='p-3 bg-neutral-900 border border-neutral-700 rounded'>
              <p className='text-xs text-neutral-400 mb-1'>ISO 8601</p>
              <div className='flex justify-between items-center'>
                <code className='text-sm text-neutral-200'>
                  {humanReadable}
                </code>
                <button
                  onClick={() => copyToClipboard(humanReadable)}
                  className='px-3 py-1 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors text-xs'
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default TimestampConverter
