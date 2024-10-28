'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface TrackCardProps {
  artists: {
    name: string
  }[]
  songUrl: string
  title: string
  album: string
  image: string
}

const TrackCard: React.FC<TrackCardProps> = ({
  artists,
  songUrl,
  title,
  album,
  image,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const [isHovered, setIsHovered] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768)
  }

  React.useEffect(() => {
    checkIfMobile()

    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
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
      </motion.div>
      <div className='flex flex-col overflow-hidden'>
        <Link
          href={songUrl}
          target='_blank'
          className='underline decoration-stone-100 transition-colors hover:decoration-stone-200 focus:decoration-stone-500 decoration-wavy'
        >
          <h3 className='hover:font-semibold text-stone-100 text-sm sm:text-base truncate'>
            {title}
          </h3>
        </Link>
        <p className='text-stone-200 text-xs sm:text-sm truncate'>
          by {artists.map((artist) => artist.name).join(', ')}
        </p>
      </div>

      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className='absolute right-full top-1/2 transform -translate-y-1/2 mr-4 w-72 h-80 rounded-lg overflow-hidden z-10 hidden md:block'
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
                className='text-lg text-stone-200 mb-1'
              >
                by {artists.map((artist) => artist.name).join(', ')}
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-sm text-stone-300'
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
