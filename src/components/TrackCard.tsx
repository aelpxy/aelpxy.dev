'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

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
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-row items-center space-x-4 border py-5 px-6 border-neutral-800 ease-in-out transition-colors hover:border-neutral-700'
    >
      <Image
        src={image}
        alt={title}
        className='h-16 w-18 rounded-md'
        height={64}
        width={64}
      />
      <div className='flex flex-col'>
        <Link
          href={songUrl}
          target='_blank'
          className='focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500'
        >
          <h3 className='font-semibold text-neutral-100'>{title}</h3>
        </Link>
        <p>{artists.map((artist) => artist.name).join(', ')}</p>
        <p>{album}</p>
      </div>
    </motion.div>
  )
}

export default TrackCard
