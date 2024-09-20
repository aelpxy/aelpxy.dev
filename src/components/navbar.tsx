'use client'

import { motion } from 'framer-motion'
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
  {
    name: 'music',
    href: '/music',
  },
]

import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className='py-2 select-none sticky top-0 z-10'
    >
      <div className='mx-auto max-w-[70rem] px-6 lg:px-32 py-2 select-none'>
        <motion.div
          initial={{ translateY: -20 }}
          animate={{ translateY: 0 }}
          className='flex w-full items-center justify-between py-4 px-6 rounded-xl bg-neutral-950 backdrop-filter bg-opacity-30 backdrop-blur-md border border-neutral-900/90'
        >
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
                    className='h-12 w-auto rounded-md border-neutral-600'
                    src={'/image.png'}
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
                  className={`px-1.5 py-1 ease-in-out rounded-md transition-all  ${
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
