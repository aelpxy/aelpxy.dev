'use client'

import { motion } from 'motion/react'
import React from 'react'

interface ToolCardProps {
  title: string
  description: string
  children: React.ReactNode
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='border border-neutral-800 p-6 hover:border-neutral-700 transition-colors'
    >
      <h2 className='text-xl font-medium text-neutral-50 mb-2'>{title}</h2>
      <p className='text-sm text-neutral-400 mb-4'>{description}</p>
      {children}
    </motion.div>
  )
}

export default ToolCard
