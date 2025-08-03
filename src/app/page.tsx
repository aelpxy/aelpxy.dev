import type { Metadata } from 'next'

import { Link } from 'next-view-transitions'

import BlogPostLink from '@/components/blog-post-link'
import Content from '@/components/content'

import { baseUrl } from '@/lib/sitemap'
import { client } from '@/server/rpc-client'

export const metadata: Metadata = {
  title: 'aelpxy',
  description: 'home',
  openGraph: {
    title: 'aelpxy',
    description: 'home',
    images: `${baseUrl}/open-graph?type=home`,
  },
}

export default async function Page() {
  const posts = await client.posts.sortByRecent()

  return (
    <main>
      <Content title='whoami'>
        <section className='px-0 py-6 sm:py-12 text-md'>
          <div className='text-neutral-300 mt-6 sm:text-xl text-base font-light'>
            <p className='text-base tracking-tight'>
              software and infrastructure engineer. very keen to tinker with
              electronics.
            </p>
            <p className='mt-2 text-base tracking-tight'>
              If you ever feel like giving up, remember it&apos;s only the
              beginning.
            </p>
          </div>
        </section>

        <div className='py-4'>
          <h1 className='text-2xl sm:text-3xl lg:text-3xl text-neutral-50'>
            posts
          </h1>
          <div className='py-6'>
            {posts.map((post) => (
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
