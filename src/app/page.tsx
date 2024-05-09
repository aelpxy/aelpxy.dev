import type { Metadata } from 'next'
import Link from 'next/link'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Content from '@/components/Content'

export const metadata: Metadata = {
  title: 'aelpxy',
  description: 'about',
  openGraph: {
    title: 'aelpxy',
    description: 'about',
    images: 'https://avatars.githubusercontent.com/u/84912564',
  },
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className='fixed inset-0 z-[-1] pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-radial from-[#6871a3] via-[#020506] to-transparent blur-2xl' />
        <div className='absolute inset-0 bg-gradient-conic from-[#171111] via-[#000000] blur-2xl' />
        <div className='absolute inset-0 bg-gradient-to-br from-[#000000] via-[#0d0d0d] to-[#151515] opacity-50' />
      </div>
      <Content title='about'>
        <section className='px-0 sm:px-28 py-6 sm:py-12'>
          <h3 className='py-6 text-xl sm:text-2xl lg:text-3xl'>hey! 👋</h3>
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
            . I also have occasional experience in Rust. I enjoy building data
            driven solutions. While my primary focus is on backend engineering,
            where I have the most experience, I occasionally do frontend
            development.
          </p>

          <p className='py-4 sm:py-8 text-base sm:text-lg lg:text-xl'>
            I consider software development to be a creative art rather than
            just work. I prioritize performance and security as my primary
            focuses when building something.
          </p>
        </section>
      </Content>
      <Footer />
    </main>
  )
}
