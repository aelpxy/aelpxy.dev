'use client'

import { motion } from 'motion/react'
import { FaGithub } from 'react-icons/fa6'
import { MdAlternateEmail } from 'react-icons/md'

import Tooltip from '@/components/tooltip'
import { Link } from 'next-view-transitions'

const socialLinks = [
  { href: 'https://github.com/aelpxy', Icon: FaGithub, label: 'GitHub' },
  { href: 'mailto:aelpxy@velta.dev', Icon: MdAlternateEmail, label: 'Email' },
]

const Footer = () => {
  return (
    <motion.footer className='mt-2 border-neutral-800 mx-auto mb-2 px-6 sm:px-12 lg:px-32 py-10 sm:py-16 max-w-[60rem] border'>
      <div className='flex flex-col items-center justify-between pt-6 sm:pt-10 space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 border-t border-neutral-800'>
        <Tooltip text='https://creativecommons.org/licenses/by-sa/4.0/deed.en'>
          <Link
            rel='noreferrer noopener'
            target='_blank'
            href={'https://creativecommons.org/licenses/by-sa/4.0/deed.en'}
            className='mr-0 transition-transform duration-300 ease-in-out text-sm sm:text-base text-neutral-300 hover:text-neutral-400'
          >
            © {new Date().getFullYear()} - aelpxy.dev
          </Link>
        </Tooltip>

        <div className='flex items-center space-x-4'>
          {socialLinks.map(({ href, Icon, label }, index) => (
            <motion.a
              key={label}
              href={href}
              rel='noreferrer noopener'
              target='_blank'
              aria-label={label}
              className='bg-neutral-900 text-neutral-300 transition-all duration-300 ease-in-out p-2 border border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100'
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
