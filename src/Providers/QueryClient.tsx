'use client'

import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/react-query/queryClient'

type QueryClientCustomProviderProps = {
  children: React.ReactNode
}

export function QueryClientCustomProvider({
  children
}: QueryClientCustomProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
