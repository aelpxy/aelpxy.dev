'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { MdAlternateEmail } from 'react-icons/md'

const socialLinks = [
  { href: 'https://github.com/aelpxy', Icon: FaGithub, label: 'GitHub' },
  {
    href: 'https://instagram.com/aelpxy',
    Icon: FaInstagram,
    label: 'Instagram',
  },
  { href: 'https://twitter.com/aelpxy', Icon: FaXTwitter, label: 'Twitter' },
  { href: 'mailto:aelpxy@velta.dev', Icon: MdAlternateEmail, label: 'Email' },
]

const Footer = () => {
  return (
    <motion.footer
      className='mx-auto px-6 sm:px-12 lg:px-32 py-10 sm:py-16 max-w-[65rem]'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='flex flex-col items-center justify-between pt-6 sm:pt-10 space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4'>
        <span className='mr-0 transition-transform duration-300 ease-in-out text-sm sm:text-base text-neutral-300'>
          CC BY-SA © {new Date().getFullYear()} aelpxy.
        </span>

        <div className='flex items-center space-x-4'>
          {socialLinks.map(({ href, Icon, label }, index) => (
            <motion.a
              key={label}
              href={href}
              rel='noreferrer noopener'
              target='_blank'
              aria-label={label}
              className='bg-neutral-900 text-neutral-300 transition-all duration-300 ease-in-out p-2 rounded-xl border border-neutral-800 hover:bg-neutral-800 hover:text-neutral-100'
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                delay: 0.1 * index,
              }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
