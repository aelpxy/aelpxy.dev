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
      className='flex flex-row items-center space-x-4 border py-5 px-6 border-neutral-800 ease-in-out transition-colors hover:border-neutral-600'
    >
      <Image
        src={image}
        alt={name}
        className='h-16 w-16 rounded-md'
        width={64}
        height={64}
      />
      <div className='flex flex-col'>
        <Link
          href={url}
          target='_blank'
          className='focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500'
        >
          <h3 className='font-semibold text-neutral-100'>{name}</h3>
        </Link>
        <p>{followers} followers</p>
      </div>
    </motion.div>
  )
}

export default ArtistCard
