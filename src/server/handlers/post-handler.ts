import { os } from '@orpc/server'
import * as z from 'zod'

import { getBlogPosts } from '@/lib/markdown'

const PostSchema = z.object({
  slug: z.string(),
})

export const sortLatestPosts = os.handler(async () => {
  try {
    const allBlogs = getBlogPosts()

    const recentPosts = allBlogs
      .filter((post) => !post.metadata.isDraft)
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime()
      )
      .slice(0, 3)

    return recentPosts
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    throw new Error('Failed to fetch recent posts')
  }
})

export const findPost = os.input(PostSchema).handler(async ({ input }) => {
  try {
    const allBlogs = getBlogPosts()
    const post = allBlogs.find((post) => post.slug === input.slug)

    if (!post) {
      throw new Error(`Post with slug '${input.slug}' not found`)
    }

    return post
  } catch (error) {
    console.error('Error finding post:', error)
    throw error
  }
})
