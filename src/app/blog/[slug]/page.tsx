import { notFound } from 'next/navigation'
import * as React from 'react'

import { MDX } from '@/components/mdx'
import { formatDate } from '@/lib/date'
import { baseUrl } from '@/lib/sitemap'
import { getBlogPosts } from '@/lib/utils'

import Content from '@/components/content'

// @ts-ignore
export default function Page({ params }) {
  const { slug } = params

  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <Content title={post.metadata.title}>
      <h2 className='text-xl py-6 tracking-tighter text-stone-100 font-mono'>
        <span className='select-none'>`</span>/blog/{post.slug}
        <span className='select-none'>`</span>
      </h2>

      <article className='prose'>
        {post.metadata.isDraft === 'true' ? (
          <blockquote>This article is still a work in progress.</blockquote>
        ) : (
          <>
            <div className='flex justify-between items-center mb-8 text-sm'>
              <p className='text-sm text-stone-400'>
                {formatDate(post.metadata.publishedAt)}
              </p>
            </div>

            {/* @ts-ignore */}
            <MDX source={post.content} />
          </>
        )}
      </article>

      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'aelpxy',
            },
          }),
        }}
      />
    </Content>
  )
}

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// @ts-ignore
export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/open-graph?type=blog&title=${encodeURIComponent(title)}&path=~/blog/${post.slug}&date=${formatDate(post.metadata.publishedAt)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
