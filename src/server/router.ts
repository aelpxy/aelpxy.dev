import { findPost, sortLatestPosts } from './handlers/post-handler'

export const rpcRouter = {
  posts: {
    sortByRecent: sortLatestPosts,
    findBySlug: findPost,
  },
}
