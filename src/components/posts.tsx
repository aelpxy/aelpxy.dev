import Link from 'next/link'
import { getBlogPosts } from '@/lib/utils'

import PostCard from './PostCard'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs.length === 0 && (
        <code className='text-2xl py-6 font-semibold'>nothing yet :(</code>
      )}
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className='flex flex-col space-y-1 mb-4'
            href={`/blog/${post.slug}`}
          >
            <PostCard
              title={post.metadata.title}
              summary={post.metadata.summary}
              author={post.metadata.author}
              publishedAt={post.metadata.publishedAt}
            />
          </Link>
        ))}
    </div>
  )
}
