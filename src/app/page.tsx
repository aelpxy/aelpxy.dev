import type { Metadata } from 'next'
import Link from 'next/link'

import Content from '@/components/Content'

export const metadata: Metadata = {
  title: 'aelpxy',
  description: 'about',
  openGraph: {
    title: 'aelpxy',
    description: 'about',
    images: 'https://aelpxy.dev/image.png',
  },
}

export default function Home() {
  return (
    <main>
      <div className='fixed inset-0 z-[-1] pointer-events-none bg-gradient-radial from-[#371818] via-[#020506] to-transparent blur-2xl animate-gradient-move' />

      <Content title='about'>
        <section className='px-0 sm:px-28 py-6 sm:py-12'>
          <h2 className='py-6 text-xl sm:text-2xl lg:text-3xl'>hey! 👋</h2>
          <p className='text-base sm:text-lg lg:text-xl'>
            I&apos;m a software developer proficient in TypeScript and Go with
            over five years of experience, currently serving as the CTO at{' '}
            <Link
              href='https://pandabase.io'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:bg-neutral-100 hover:text-neutral-900 px-0.5 py-0.5 transition-all ease-in-out'
            >
              Pandabase
            </Link>
            .
          </p>
          <p className='mt-4 text-base sm:text-lg lg:text-xl'>
            I enjoy <b>backend development</b> and <b>system design</b>.
          </p>
        </section>
      </Content>
    </main>
  )
}
