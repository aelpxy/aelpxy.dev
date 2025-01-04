import { getBlogPosts } from '@/lib/utils'
import Link from 'next/link'

import PostCard from './post-card'

export function BlogPosts() {
  let posts = getBlogPosts()

  const publishedBlogs = posts.filter(
    (post) => post.metadata.isDraft === 'false'
  )

  return (
    <div>
      {publishedBlogs.length === 0 && (
        <code className='text-2xl py-6'>nothing yet :/</code>
      )}

      {publishedBlogs
        .sort(
          (a, b) =>
            // @ts-ignore
            new Date(b.metadata.publishedAt) - new Date(a.metadata.publishedAt)
        )
        .map((post) => (
          <Link
            key={post.slug}
            className='flex flex-col space-y-1 mb-4'
            href={`/blog/${post.slug}`}
          >
            <PostCard
              title={post.metadata.title}
              summary={post.metadata.summary}
              publishedAt={post.metadata.publishedAt}
            />
          </Link>
        ))}
    </div>
  )
}
