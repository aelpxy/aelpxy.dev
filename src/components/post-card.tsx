'use client'

import { formatDate } from '@/lib/date'
import { motion } from 'motion/react'

interface PostCardProps {
  title: string
  publishedAt: string
  summary: string
}

const PostCard: React.FC<PostCardProps> = ({ title, publishedAt, summary }) => {
  return (
    <motion.div className='group flex flex-col overflow-hidden ease-in-out transition-colors hover:border-neutral-700 border-neutral-800 border'>
      <div className='flex-1 p-6 flex flex-col justify-between'>
        <div>
          <motion.h3 className='font-medium text-lg text-neutral-50 underline decoration-neutral-600 underline-offset-4 transition-colors group-hover:decoration-neutral-500 focus:decoration-neutral-500 focus:outline-offset-6 group-hover:decoration-wavy'>
            {title}
          </motion.h3>
          <motion.p className='text-neutral-300 text-base py-2 text-wrap'>
            {summary}
          </motion.p>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <motion.p className='text-neutral-500 text-sm'>
            {formatDate(publishedAt)}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard
