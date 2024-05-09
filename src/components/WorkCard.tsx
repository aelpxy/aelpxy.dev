'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface WorkProps {
  title: string
  jobTitle: string
  description: string
  link: string
  year: string
}

const WorkCard: React.FC<WorkProps> = ({
  title,
  jobTitle,
  description,
  link,
  year,
}) => {
  return (
    <motion.div
      className='flex items-center border border-neutral-800 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='flex-1 p-4 sm:p-6 flex justify-between items-center'>
        <div className='flex-1 flex flex-col items-start'>
          <motion.h3
            className='font-focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500 text-base sm:text-lg'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
          >
            <Link href={link} target='_blank' rel='noreferrer noopener'>
              {title} <code>({link})</code>
            </Link>
          </motion.h3>
          <motion.p
            className='text-neutral-300 text-sm sm:text-base py-1'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
        <div className='text-right'>
          <motion.p
            className='text-neutral-400 text-sm sm:text-base font-medium'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }}
          >
            {jobTitle}
          </motion.p>
          <motion.p
            className='text-neutral-500 text-xs sm:text-sm'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.4 }}
          >
            {year}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default WorkCard
