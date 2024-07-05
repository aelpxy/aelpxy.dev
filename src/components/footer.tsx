'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { MdAlternateEmail } from 'react-icons/md'

const Footer: React.FC = () => {
  return (
    <motion.footer
      className='mx-auto px-6 sm:px-12 lg:px-32 py-10 sm:py-16 max-w-7xl'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='flex flex-col items-center justify-between pt-6 sm:pt-10 space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4'>
        <motion.code className='mr-0 transition-transform duration-300 ease-in-out text-sm sm:text-base'>
          CC BY-SA © <time>{new Date().getFullYear()}</time> aelpxy.
        </motion.code>

        <div className='flex items-center space-x-4'>
          <motion.a
            href='https://github.com/aelpxy'
            rel='noreferrer noopener'
            target='_blank'
            className='hover:bg-neutral-800 hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 rounded-xl border border-neutral-800'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
          >
            <FaGithub />
          </motion.a>

          <motion.a
            href='https://instagram.com/aelpxy'
            rel='noreferrer noopener'
            target='_blank'
            className='hover:bg-neutral-800 hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 rounded-xl border border-neutral-800'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
          >
            <FaInstagram />
          </motion.a>

          <motion.a
            href='https://twitter.com/aelpxy'
            rel='noreferrer noopener'
            target='_blank'
            className='hover:bg-neutral-800 hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 rounded-xl border border-neutral-800'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
          >
            <FaXTwitter />
          </motion.a>

          <motion.a
            href='mailto:aelpxy@velta.dev'
            rel='noreferrer noopener'
            target='_blank'
            className='hover:bg-neutral-800 hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 rounded-xl border border-neutral-800'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
          >
            <MdAlternateEmail />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
