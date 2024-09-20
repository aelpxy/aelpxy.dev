'use client'

import React, { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ContentProps {
  title: string
  children: ReactNode
}

const Content: FC<ContentProps> = ({ title, children }) => {
  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className='mx-auto max-w-[68rem] px-6 sm:px-12 lg:px-32 py-12 sm:py-16 lg:py-20'
    >
      <h1 className='text-2xl sm:text-3xl lg:text-3xl text-neutral-50'>
        {title}
      </h1>
      {children}
    </motion.section>
  )
}

export default Content
