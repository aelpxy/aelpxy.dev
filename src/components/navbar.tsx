'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'

const navData = [
  {
    name: 'home',
    href: '/',
  },
  {
    name: 'blog',
    href: '/blog',
  },
]

import { Link } from 'next-view-transitions'
import Image from 'next/image'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <motion.div className='select-none sticky top-0 z-10'>
      <div className='mx-auto max-w-[76rem] lg:px-32  select-none'>
        <motion.div className='flex w-full items-center justify-between py-4 px-6 bg-neutral-900/10 backdrop-filter bg-opacity-30 backdrop-blur-sm border border-neutral-800'>
          <div>
            <div className='flex lg:flex-1 select-none'>
              <Link href='/'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='-m-1.5 p-1.5'
                >
                  <span className='sr-only'>aelpxy</span>
                  <Image
                    className='h-12 w-auto border-neutral-600'
                    src={'/favicon.png'}
                    alt='Icon'
                    width={256}
                    height={256}
                  />
                </motion.div>
              </Link>
            </div>
          </div>
          <div>
            {navData.map((link) => (
              <Link key={link.name} href={link.href} className='px-2.5'>
                <motion.code
                  className={`px-1.5 py-1 ease-in-out transition-all  ${
                    pathname === link.href
                      ? 'text-neutral-100 underline decoration-wavy'
                      : 'text-neutral-400 hover:underline decoration-wavy'
                  }`}
                >
                  {link.name}
                </motion.code>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Navbar
