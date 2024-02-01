import { AsideMenu } from '@/components/AsideMenu'
import { Header } from '@/components/Header'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <div className="flex w-full h-full">
        <AsideMenu />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </main>
  )
}
