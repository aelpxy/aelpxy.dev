import { os } from '@orpc/server'
import * as z from 'zod'

import { getBlogPosts } from '@/lib/markdown'

const PostSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional(),
})

export const sortLatestPosts = os.handler(async ({ input }) => {
  const allBlogs = getBlogPosts()

  const recentPosts = allBlogs
    .filter((post) => post.metadata.isDraft === 'false')
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 3)

  return recentPosts
})

export const findPost = os
  .input(PostSchema.pick({ id: true }))
  .handler(async ({ input }) => {
    return { id: 1, name: 'name' }
  })
