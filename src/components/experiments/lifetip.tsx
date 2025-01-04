'use client'

import { RefreshCw } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

interface LifeTipResponse {
  tip: string
}

const Lifetip: React.FC = () => {
  const [tip, setTip] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchTip = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1)) // wanted to do manual delays but not for now

      const response = await fetch('/api/lifetip')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: LifeTipResponse = await response.json()
      setTip(data.tip)
    } catch (e: any) {
      setError(e.message || 'An error occurred while fetching the tip.')
      setTip(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTip()
  }, [fetchTip])

  const handleRefetch = () => {
    fetchTip()
  }

  const SkeletonLoading = () => {
    return (
      <div className='space-y-3'>
        <div className='h-[1rem] rounded-md bg-stone-700 w-[20rem] mb-4 animate-pulse'></div>
        <div className='h-[1rem] rounded-md bg-stone-700 w-[20rem] mb-4 animate-pulse'></div>
        <div className='h-[1rem] rounded-md bg-stone-700 w-[20rem] mb-4 animate-pulse'></div>
      </div>
    )
  }

  const ErrorIndicator = () => {
    return <span className='text-red-600'>{error}</span>
  }

  const Renderer = () => {
    if (isLoading) {
      return SkeletonLoading()
    }

    if (error) {
      return ErrorIndicator()
    }

    if (tip) {
      return (
        <p className='mb-4 text-stone-300 italic text-lg text-center font-mono'>
          “{tip}”
        </p>
      )
    }

    return null
  }

  return (
    <div className='w-full p-4 dark flex justify-center relative'>
      <button
        onClick={handleRefetch}
        disabled={isLoading}
        className={`absolute top-2 right-2 group hover:bg-stone-900 hover:text-stone-300 transition-all duration-300 ease-in-out
          border border-stone-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-1 rounded-md`}
      >
        <RefreshCw
          className={`h-[1.2rem] w-[1.2rem] ${isLoading ? 'animate-spin' : ''}`}
        />
      </button>
      <div className='w-full max-w-md flex flex-col items-center'>
        {Renderer()}
      </div>
    </div>
  )
}

export default Lifetip
