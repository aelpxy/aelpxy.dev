import type { Metadata } from 'next'
import Link from 'next/link'

import Content from '@/components/Content'

export const metadata: Metadata = {
  title: 'aelpxy',
  description: 'not found',
  openGraph: {
    title: 'aelpxy',
    description: 'not found',
    images: 'https://avatars.githubusercontent.com/u/84912564',
  },
}

export default function NotFound() {
  return (
    <>
      <Content title='404'>
        <div>
          <h1 className='text-2xl py-6 font-semibold'>
            The page you requested was not found.
          </h1>
          <div className='mt-10' />
          <Link
            href='/'
            className='hover:bg-neutral-900 hover:text-neutral-300 transition-all duration-300 ease-in-out p-2 rounded-xl border border-neutral-800'
          >
            Return to home
          </Link>
        </div>
      </Content>
    </>
  )
}
