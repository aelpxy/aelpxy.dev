import { findPost, sortLatestPosts } from './handlers/post-handler'
import { createShare, getShare } from './handlers/share-handler'

export const rpcRouter = {
  posts: {
    sortByRecent: sortLatestPosts,
    findBySlug: findPost,
  },
  shares: {
    create: createShare,
    get: getShare,
  },
}
