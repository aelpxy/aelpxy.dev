'use client'
import { motion } from 'framer-motion'

interface PostCardProps {
  title: string
  publishedAt: string
  summary: string
  author: string
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  publishedAt,
  summary,
  author,
}) => {
  return (
    <motion.div
      className='flex flex-col border border-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out '
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='flex-1 p-6 flex flex-col justify-between'>
        <div>
          <motion.h3
            className='font-medium text-lg text-white underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-500 focus:decoration-neutral-500 focus:outline-offset-6'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className='text-neutral-300 text-base py-2 text-wrap'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.2 }}
          >
            {summary}
          </motion.p>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <motion.p
            className='text-neutral-400 text-base font-medium'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }}
          >
            {author}
          </motion.p>
          <motion.p
            className='text-neutral-500 text-sm'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.4 }}
          >
            {publishedAt}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
export default PostCard
