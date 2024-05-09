'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface WorkProps {
  title: string
  jobTitle: string
  link: string
  year: string
}

const WorkCard: React.FC<WorkProps> = ({ title, jobTitle, link, year }) => {
  return (
    <motion.div
      className='flex items-center border border-neutral-800 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='flex-1 p-4 sm:p-6 flex justify-between items-center'>
        <motion.h3
          className='font-semibold text-neutral-100 text-base sm:text-lg'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
        >
          {title}{' '}
          <Link
            href={link}
            target='_blank'
            rel='noreferrer noopener'
            className='text-sm focus:outline-offset-6 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500'
          >
            <code>({link})</code>
          </Link>
        </motion.h3>

        <div className='text-right'>
          <motion.p
            className='text-neutral-400 text-sm sm:text-base font-medium'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.2 }}
          >
            {jobTitle}
          </motion.p>
          <motion.p
            className='text-neutral-500 text-xs sm:text-sm'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }}
          >
            {year}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default WorkCard
