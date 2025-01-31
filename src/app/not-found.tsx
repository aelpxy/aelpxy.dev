import type { Metadata } from 'next'
import { Link } from 'next-view-transitions'

import Content from '@/components/content'

export const metadata: Metadata = {
  title: 'aelpxy ~ uh oh!',
  description: 'not found',
  openGraph: {
    title: 'aelpxy',
    description: 'not found',
  },
}

const hiddenLinks = [
  {
    name: '~/cheatsheet',
    href: '/~/secret/cheatsheet',
  },
  {
    name: '~/experiments',
    href: '/~/secret/experiments',
  },
  {
    name: '~/music',
    href: '/~/secret/music',
  },
  {
    name: '~/photos',
    href: '/~/secret/photos',
  },
  {
    name: '~/books',
    href: '/~/secret/books',
  },
  {
    name: '~/tools',
    href: '/~/secret/tools',
  },
]

export default function NotFound() {
  return (
    <Content title='~$ Unknown command'>
      <div className='mt-10'>
        <div>
          <h1 className='text-2xl py-6 font-semibold'>
            What are you looking for?
          </h1>
          <p>
            Oops, I don&apos;t think it&apos;s here {':('} (too bad, but hey,
            you&apos;re amazing!)
          </p>
        </div>
        <div className='mt-10'>
          <p>In the meantime, feel free to check out these!</p>

          <div className='py-10'>
            <Link
              href='/'
              className='hover:bg-neutral-900 hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 border border-neutral-800'
            >
              ~/home
            </Link>
            <Link
              href='/blog'
              className='hover:bg-neutral-900 hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 border border-neutral-800'
            >
              ~/blog
            </Link>
          </div>
          <p>
            Shh, don&apos;t tell anyone about these; they&apos;re hidden and
            just for you!
          </p>
        </div>
        <div className='py-10 flex flex-col space-y-2'>
          {hiddenLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className='hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 hover:underline decoration-wavy'
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </Content>
  )
}
