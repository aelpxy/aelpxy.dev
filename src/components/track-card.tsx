'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PlayCircle, PauseCircle } from 'lucide-react'

interface TrackCardProps {
  artists: {
    name: string
  }[]
  songUrl: string
  title: string
  album: string
  image: string
  preview_url: string
}

const TrackCard: React.FC<TrackCardProps> = ({
  artists,
  songUrl,
  title,
  album,
  image,
  preview_url,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const isInView = useInView(ref, { once: true })

  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio(preview_url)
    audioRef.current.volume = 0.5

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
    }
  }, [preview_url])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (audioRef.current && isPlaying) {
      fadeOutAudio()
    }
  }

  const fadeOutAudio = () => {
    if (audioRef.current) {
      const fadeOutInterval = 50
      const fadeOutStep = 0.05

      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0) {
          audioRef.current.volume = Math.max(
            0,
            audioRef.current.volume - fadeOutStep
          )
        } else {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current)
          }
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }
          setIsPlaying(false)
        }
      }, fadeOutInterval)
    }
  }

  const togglePlayPause = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (audioRef.current) {
      if (isPlaying) {
        fadeOutAudio()
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current)
        }
        audioRef.current.volume = 0.5
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className='relative flex flex-row items-center space-x-3 py-4 px-3 sm:space-x-4 sm:py-5 sm:px-6 ease-in-out transition-colors'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        initial={{ filter: 'blur(10px)' }}
        animate={{ filter: isInView ? 'blur(0px)' : 'blur(10px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className='flex-shrink-0 relative'
      >
        <Image
          src={image}
          alt={title}
          className='h-12 w-12 sm:h-16 sm:w-16 rounded-md'
          height={64}
          width={64}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md cursor-pointer'
              onClick={togglePlayPause}
            >
              <motion.div
                key={isPlaying ? 'pause' : 'play'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isPlaying ? (
                  <PauseCircle className='text-white' size={32} />
                ) : (
                  <PlayCircle className='text-white' size={32} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className='flex flex-col overflow-hidden'>
        <Link
          href={songUrl}
          target='_blank'
          className='underline decoration-neutral-100 transition-colors hover:decoration-neutral-200 focus:decoration-neutral-500 decoration-wavy'
        >
          <h3 className='hover:font-semibold text-neutral-100 text-sm sm:text-base truncate'>
            {title}
          </h3>
        </Link>
        <p className='text-neutral-200 text-xs sm:text-sm truncate'>
          by {artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className='absolute right-full top-1/2 transform -translate-y-1/2 mr-4 w-72 h-80 rounded-lg overflow-hidden z-10'
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='absolute inset-0 bg-black bg-opacity-30' />
            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent' />
            <div className='relative h-full flex flex-col justify-end p-6 text-white'>
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className='text-2xl font-bold mb-2'
              >
                {album}
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='text-lg text-neutral-200 mb-1'
              >
                by {artists.map((artist) => artist.name).join(', ')}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-sm text-neutral-300'
              >
                featuring {title}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TrackCard
