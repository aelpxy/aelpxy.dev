import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import { serializer } from '../../server/serializer'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        serializeData(data) {
          return serializer.serialize(data)
        },
      },
      hydrate: {
        deserializeData(data) {
          return serializer.deserialize(data)
        },
      },
    },
  })
}
