import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { ReactNode } from 'react'

const QUERY_CACHE_MAX_AGE_MS = 1000 * 60 * 60
const QUERY_CACHE_KEY = 'ads-market-tool-react-query-cache'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error('[React Query] Query failed', {
        queryKey: query.queryKey,
        error,
      })
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      console.error('[React Query] Mutation failed', {
        mutationKey: mutation.options.mutationKey,
        error,
      })
    },
  }),
  defaultOptions: {
    queries: {
      gcTime: QUERY_CACHE_MAX_AGE_MS,
    },
  },
})

const sessionStoragePersister = createAsyncStoragePersister({
  key: QUERY_CACHE_KEY,
  storage:
    typeof window !== 'undefined'
      ? {
          getItem: (key) => Promise.resolve(window.sessionStorage.getItem(key)),
          removeItem: (key) => {
            window.sessionStorage.removeItem(key)
            return Promise.resolve()
          },
          setItem: (key, value) => {
            window.sessionStorage.setItem(key, value)
            return Promise.resolve()
          },
        }
      : undefined,
})

type QueryProviderProps = {
  children: ReactNode
}

export const QueryProvider = ({ children }: QueryProviderProps) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      maxAge: QUERY_CACHE_MAX_AGE_MS,
      persister: sessionStoragePersister,
    }}
  >
    {children}
  </PersistQueryClientProvider>
)
