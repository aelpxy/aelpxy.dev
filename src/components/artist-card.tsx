'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { motion, useInView } from 'framer-motion'

interface ArtistCardProps {
  name: string
  url: string
  image: string
  followers: Promise<string>
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  name,
  url,
  image,
  followers,
}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-row items-center space-x-3 py-4 px-3 sm:space-x-4 sm:py-5 sm:px-6 ease-in-out transition-colors'
    >
      <motion.div
        initial={{ filter: 'blur(10px)' }}
        animate={{ filter: isInView ? 'blur(0px)' : 'blur(10px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className='flex-shrink-0'
      >
        <Image
          src={image}
          alt={name}
          className='h-12 w-12 sm:h-16 sm:w-16 rounded-md'
          width={64}
          height={64}
        />
      </motion.div>
      <div className='flex flex-col overflow-hidden'>
        <Link
          href={url}
          target='_blank'
          className='underline decoration-neutral-100 transition-colors hover:decoration-neutral-200 focus:decoration-neutral-500 decoration-wavy'
        >
          <h3 className='hover:font-semibold text-neutral-100 text-sm sm:text-base truncate'>
            {name}
          </h3>
        </Link>
        <p className='text-neutral-200 text-xs sm:text-sm truncate'>
          {followers} followers
        </p>
      </div>
    </motion.div>
  )
}

export default ArtistCard
