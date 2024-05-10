import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { formatDate, getBlogPosts } from '@/lib/utils'
import { baseUrl } from '@/lib/sitemap'

import Content from '@/components/Content'

// @ts-ignore
export default function Post({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main>
      <Content title={`blog/${post.slug}`}>
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
              // image: post.metadata.image
              //   ? `${baseUrl}${post.metadata.image}`
              //   : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'Aelpxy',
              },
            }),
          }}
        />
        <h1 className='text-2xl py-6 font-semibold tracking-tighter'>
          {post.metadata.title}
        </h1>

        <div className='flex justify-between items-center mb-8 text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {formatDate(post.metadata.publishedAt)} by {post.metadata.author}
          </p>
        </div>
        <article className='prose'>
          {/* @ts-ignore */}
          <CustomMDX source={post.content} />
        </article>
      </Content>
    </main>
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
    // image,
  } = post.metadata
  // let ogImage = image
  //   ? image
  //   : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      // images: [
      //   {
      //     url: ogImage,
      //   },
      // ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images: [ogImage],
    },
  }
}
