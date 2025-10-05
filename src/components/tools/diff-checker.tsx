'use client'

import { useState } from 'react'
import ToolCard from './tool-card'

const DiffChecker = () => {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diff, setDiff] = useState<
    Array<{ type: 'add' | 'remove' | 'same'; line: string }>
  >([])

  const computeDiff = () => {
    const lines1 = text1.split('\n')
    const lines2 = text2.split('\n')
    const result: Array<{ type: 'add' | 'remove' | 'same'; line: string }> = []

    const maxLength = Math.max(lines1.length, lines2.length)

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i]
      const line2 = lines2[i]

      if (line1 === undefined && line2 !== undefined) {
        result.push({ type: 'add', line: line2 })
      } else if (line2 === undefined && line1 !== undefined) {
        result.push({ type: 'remove', line: line1 })
      } else if (line1 !== line2) {
        result.push({ type: 'remove', line: line1 })
        result.push({ type: 'add', line: line2 })
      } else {
        result.push({ type: 'same', line: line1 })
      }
    }

    setDiff(result)
  }

  return (
    <ToolCard
      title='Diff Checker'
      description='Compare two text blocks and see the differences.'
    >
      <div className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Original Text</label>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder='Enter original text...'
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[200px] resize-y'
            />
          </div>
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Modified Text</label>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder='Enter modified text...'
              className='w-full px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-sm min-h-[200px] resize-y'
            />
          </div>
        </div>

        <button
          onClick={computeDiff}
          disabled={!text1 && !text2}
          className='px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Compare
        </button>

        {diff.length > 0 && (
          <div className='space-y-2'>
            <label className='text-sm text-neutral-400'>Differences</label>
            <div className='p-3 bg-neutral-900 border border-neutral-700 rounded font-mono text-sm'>
              {diff.map((item, index) => (
                <div
                  key={index}
                  className={`py-0.5 ${
                    item.type === 'add'
                      ? 'bg-green-900/30 text-green-400'
                      : item.type === 'remove'
                        ? 'bg-red-900/30 text-red-400'
                        : 'text-neutral-400'
                  }`}
                >
                  <span className='inline-block w-4 text-center mr-2'>
                    {item.type === 'add'
                      ? '+'
                      : item.type === 'remove'
                        ? '-'
                        : ' '}
                  </span>
                  {item.line}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolCard>
  )
}

export default DiffChecker
