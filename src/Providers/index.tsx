import { SessionProvider } from './SessionProvider'
import { ThemeProvider } from './ThemeProvider'
import { QueryClientCustomProvider } from './QueryClient'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientCustomProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </QueryClientCustomProvider>
    </SessionProvider>
  )
}
