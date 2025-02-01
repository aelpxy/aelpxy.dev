'use client'

import { motion, useInView } from 'motion/react'

import Image from 'next/image'
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

const TrackCard: React.FC<TrackCardProps> = ({ title, image, songUrl }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.a
      target='_blank'
      rel='noopener noreferrer'
      ref={ref}
      href={songUrl}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='p-1 border border-neutral-800 w-full flex justify-between items-center hover:border-neutral-700 transition hover:bg-neutral-800/5 hover:cursor-pointer'>
        <motion.div
          initial={{ filter: 'blur(10px)' }}
          animate={{ filter: isInView ? 'blur(0px)' : 'blur(5px)' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className='flex-shrink-0'
        >
          <Image
            src={image}
            alt={title}
            className='h-12 w-12 border border-neutral-700 object-cover'
            height={64}
            width={64}
          />
        </motion.div>

        <div className='mr-3'>
          <span className='underline decoration-neutral-100 transition-colors hover:decoration-neutral-200 focus:decoration-neutral-500 decoration-wavy text-sm'>
            {title}
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default TrackCard
