import type { Metadata } from 'next'

import { BriefcaseBusinessIcon, MapPinIcon } from 'lucide-react'
import Link from 'next/link'
import { FaGolang } from 'react-icons/fa6'
import { SiTypescript, SiZig } from 'react-icons/si'

import BlogPostLink from '@/components/blog-post-link'
import Content from '@/components/content'
import IconItem from '@/components/icon-item'
import ProjectCard from '@/components/project-card'
import Tooltip from '@/components/tooltip'
import WorkCard from '@/components/work-card'
import WorkSection from '@/components/work-section'

import { baseUrl } from '@/lib/sitemap'
import { getBlogPosts } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'aelpxy',
  description: 'home',
  openGraph: {
    title: 'aelpxy',
    description: 'home',
    images: `${baseUrl}/open-graph?type=home`,
  },
}

const work = [
  {
    name: 'Pandabase',
    role: 'Co-founder and CTO (Jan 2023 - Present)',
    description: 'Payment platform for the next wave of digital entrepreneurs.',
  },
  {
    name: 'Zote',
    role: 'Investor (March 2024 - Present)',
    description: 'The managed open deployment platform for everyone.',
  },
]

const projects = [
  {
    name: 'dbctl',
    role: 'Creator',
    description: 'A CLI built to help you manage databases.',
  },
  {
    name: 'void',
    role: 'Maintainer',
    description:
      'Fault tolerant KV store built to handle millions of requests.',
  },
]

export default function Home() {
  const allBlogs = getBlogPosts()

  const recentPosts = allBlogs
    .filter((post) => post.metadata.isDraft === 'false')
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 3)

  return (
    <main>
      <Content title='about'>
        <section className='px-0 sm:px-6 py-6 sm:py-12 text-md '>
          <IconItem Icon={MapPinIcon}>::1</IconItem>
          <IconItem Icon={BriefcaseBusinessIcon}>
            CTO & Co-founder @{' '}
            <Link
              className='underline decoration-wavy hover:text-stone-400 transition-all'
              href='https://pandabase.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pandabase
            </Link>
          </IconItem>
          <div className='text-stone-300 mt-12 sm:text-xl text-base font-light'>
            I‘m a software developer who loves building backends and minimalist
            frontends, I have over six years of experience with
            <Tooltip text='TypeScript'>
              <SiTypescript className='text-[#3178c6] inline-block align-middle h-[25px] w-[25px] bg-white rounded mr-1 ml-1' />
            </Tooltip>
            and
            <Tooltip text='Go'>
              <FaGolang className='text-[#00aed9] inline-block align-middle h-[40px] w-[40px] ml-0.5 mr-1' />
            </Tooltip>
            in production and currently experimenting with
            <Tooltip text='Zig'>
              <SiZig className='text-[#f6a41c] inline-block align-middle ml-1 h-[30px] w-[30px]' />
            </Tooltip>
            .
          </div>
        </section>

        <div className='flex flex-col md:flex-row justify-between max-w-4xl mx-auto '>
          <WorkSection title='work' items={work} CardComponent={WorkCard} />
          <WorkSection
            title='projects'
            items={projects}
            CardComponent={ProjectCard}
          />
        </div>

        <div className='py-4'>
          <h1 className='text-2xl sm:text-3xl lg:text-3xl text-stone-50'>
            recent posts
          </h1>
          <div className='py-6'>
            {recentPosts.map((post) => (
              <BlogPostLink key={post.slug} post={post} />
            ))}
            <Link href='/blog'>
              <span className='mt-10 text-md hover:underline tracking-tighter text-stone-300 decoration-wavy truncate ml-2'>
                read all →
              </span>
            </Link>
          </div>
        </div>
      </Content>
    </main>
  )
}
