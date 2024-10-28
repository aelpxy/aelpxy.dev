import Link from 'next/link'

import { formatDate } from '@/lib/date'

const BlogPostLink = ({ post }: { post: any }) => (
  <Link
    key={post.slug}
    className='flex flex-col space-y-1 mb-4'
    href={`/blog/${post.slug}`}
  >
    <div className='py-2 px-2 flex justify-between items-center'>
      <span className='text-xl underline underline-offset-2 tracking-tighter text-stone-300 decoration-wavy truncate mr-2'>
        {post.metadata.title}
      </span>
      <span className='text-sm text-stone-400 whitespace-nowrap'>
        {formatDate(post.metadata.publishedAt)}
      </span>
    </div>
  </Link>
)

export default BlogPostLink
