import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPinIcon, BriefcaseBusinessIcon } from 'lucide-react'

import Content from '@/components/content'
import WorkCard from '@/components/work-card'
import ProjectCard from '@/components/project-card'
import IconItem from '@/components/icon-item'
import BlogPostLink from '@/components/blog-post-link'
import WorkSection from '@/components/work-section'

import { getBlogPosts } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'aelpxy',
  description: 'about',
  openGraph: {
    title: 'aelpxy',
    description: 'about',
    images: 'https://aelpxy.dev/image.png',
  },
}

const work = [
  {
    name: 'Pandabase',
    role: 'Co-founder and CTO (January 2022 - Present)',
    description:
      'Your go-to platform for selling digital goods, with all your payment infrastructure in one place.',
  },
  {
    name: 'Zote',
    role: 'Investor and Engineer (March 2024 - Present)',
    description:
      'The AI and software company created by creative developers for the benefit of humanity.',
  },
]

const projects = [
  {
    name: 'dbctl',
    role: 'Creator',
    description:
      'A command-line tool built to help you easily manage containerized databases.',
  },
  {
    name: 'void',
    role: 'Maintainer',
    description:
      'In memory key-value fault tolerant cache built to handle millions of requests.',
  },
]

export default function Home() {
  const allBlogs = getBlogPosts()
  const recentPosts = allBlogs
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 3)

  return (
    <main>
      <Content title='about'>
        <section className='px-0 sm:px-6 py-6 sm:py-12 text-md'>
          <IconItem Icon={MapPinIcon}>::1</IconItem>
          <IconItem Icon={BriefcaseBusinessIcon}>
            Co-founder and CTO @{' '}
            <Link
              className='underline decoration-wavy hover:text-neutral-400 transition-all'
              href='https://pandabase.io'
              target='_blank'
              rel='noopener noreferrer'
            >
              Pandabase
            </Link>
          </IconItem>
          <div className='text-neutral-300 mt-12 sm:text-xl text-base'>
            I'm a software developer who loves building backends and minimalist
            frontends, I have over five years of experience with TypeScript and
            Go in production environments.
            <p className='mt-6'>
              I'm currently working on building a platform built for selling
              digital goods.
            </p>
          </div>
        </section>

        <div className='flex flex-col md:flex-row justify-between max-w-4xl mx-auto'>
          <WorkSection title='work' items={work} CardComponent={WorkCard} />
          <WorkSection
            title='projects'
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
            <Link href='/blog'>
              <span className='mt-10 text-md hover:underline tracking-tighter text-neutral-300 decoration-wavy truncate ml-2'>
                read all →
              </span>
            </Link>
          </div>
        </div>
      </Content>
    </main>
  )
}
