'use client'

import { motion } from 'motion/react'
import React from 'react'

interface ContentProps {
  title: string
  children: React.ReactNode
}

const Content: React.FC<ContentProps> = ({ title, children }) => {
  return (
    <motion.section className='mx-auto max-w-[60rem] px-6 sm:px-12 lg:px-32 py-12 sm:py-16 lg:py-20 border border-neutral-800'>
      <h1 className='text-2xl sm:text-3xl lg:text-3xl text-neutral-50'>
        {title}
      </h1>
      {children}
    </motion.section>
  )
}

export default Content
