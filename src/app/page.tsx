import type { Metadata } from 'next'

import { BriefcaseBusinessIcon, MapPinIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
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
    role: 'CTO (Jan 2023 - Present)',
    description: 'The native payments platform built for entrepreneurs.',
    link: 'https://pandabase.io',
  },
  {
    name: 'Velta, LLC.',
    role: 'Co-founder & CTO (March 2022 - Present)',
    description: 'The managed open deployment platform for everyone.',
    link: 'https://velta.dev',
  },
]

const projects = [
  {
    name: 'g/dbctl',
    role: 'Creator',
    description: 'A CLI built to help you manage databases.',
    slug: 'aelpxy/dbctl',
  },
  {
    name: 'g/void',
    role: 'Maintainer',
    description:
      'Fault tolerant KV store built to handle millions of requests.',
    slug: 'zotehq/void',
  },
]

export default function Page() {
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
      <Content title='~$ whoami'>
        <section className='px-0 py-6 sm:py-12 text-md'>
          <IconItem Icon={MapPinIcon}>
            <Tooltip text='IPv6'>
              <span className='hover:text-neutral-400 transition-all cursor-pointer'>
                ::1
              </span>
            </Tooltip>
          </IconItem>
          <IconItem Icon={BriefcaseBusinessIcon}>
            CTO & Co-founder @{' '}
            <Link
              className='underline decoration-wavy hover:text-neutral-400 transition-all'
              href='https://pandabase.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Tooltip text='pandabase.io'>
                <span className='underline decoration-wavy hover:text-neutral-400 transition-all'>
                  Pandabase
                </span>
              </Tooltip>
            </Link>
          </IconItem>
          <div className='text-neutral-300 mt-12 sm:text-xl text-base font-light'>
            <p className='text-base tracking-tight'>
              A software developer who’s been writing code for the past six
              years. I’ve worked in production environments and utilized various
              tools. I classify myself as a backend engineer with knowledge in
              frontend development.
            </p>
            <div className='mt-10 text-base tracking-tight'>
              I have a special place for these languages
              <Tooltip text='TypeScript'>
                <SiTypescript className='text-[#3178c6] inline-block align-middle h-[23px] w-[23px] bg-white rounded-sm mr-1 ml-1.5' />
              </Tooltip>
              ,
              <Tooltip text='Go'>
                <FaGolang className='text-[#00aed9] inline-block align-middle h-[40px] w-[40px] ml-0.5 mr-1' />
              </Tooltip>
              and
              <Tooltip text='Zig'>
                <SiZig className='text-[#f6a41c] inline-block align-middle ml-1.5 h-[30px] w-[30px]' />
              </Tooltip>{' '}
              are lovely.
            </div>
          </div>
        </section>

        <div className='flex flex-col md:flex-row justify-between max-w-4xl mx-auto '>
          <WorkSection title='my work' items={work} CardComponent={WorkCard} />
          <WorkSection
            title='my projects'
            items={projects}
            CardComponent={ProjectCard}
          />
        </div>

        <div className='py-4'>
          <h1 className='text-2xl sm:text-3xl lg:text-3xl text-neutral-50'>
            recent posts
          </h1>
          <div className='py-6'>
            {recentPosts.map((post) => (
              <BlogPostLink key={post.slug} post={post} />
            ))}
          </div>
          <Link href='/blog'>
            <span className='text-md hover:underline tracking-tighter text-neutral-300 decoration-wavy truncate ml-2'>
              read all →
            </span>
          </Link>
        </div>
      </Content>
    </main>
  )
}
