import { QueryClientProvider as ClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import type { ReactNode } from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000 * 60 * 10, // 10 min
    },
  },
})

export const QueryClientProvider = ({ children }: { children: ReactNode }) => (
  <ClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </ClientProvider>
)
