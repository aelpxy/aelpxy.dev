'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navData = [
  {
    name: 'work',
    href: '/work',
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
      <div className='mx-auto max-w-7xl px-6 lg:px-32 py-2 select-none'>
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[400px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-pink-300 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-pink-200 after:via-pink-400 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-pink-700 before:dark:opacity-10 after:dark:from-pink-900 after:dark:via-[#dc38e4] after:dark:opacity-40 " />

        <motion.div
          initial={{ translateY: -20 }}
          animate={{ translateY: 0 }}
          className='flex w-full items-center justify-between py-4 px-6 rounded-2xl bg-neutral-950 backdrop-filter bg-opacity-40 backdrop-blur-md border border-neutral-900'
        >
          <div>
            <div className='flex lg:flex-1 select-none'>
              <Link href='/'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='-m-1.5 p-1.5'
                >
                  <span className='sr-only'>Aelpxy</span>
                  <Image
                    className='h-12 w-auto rounded-md border-neutral-600'
                    src={'https://avatars.githubusercontent.com/u/84912564?v=4'}
                    alt='Aelpxy'
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
                  className={`px-1.5 py-1 ease-in-out rounded-md transition-all ${
                    pathname === link.href
                      ? 'text-neutral-900 bg-neutral-100 underline'
                      : 'text-neutral-300 hover:underline hover:text-neutral-900 hover:bg-neutral-100'
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
