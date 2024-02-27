import { AsideMenu } from '@/components/AsideMenu'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="w-full">
      <div className="flex w-full h-full">
        <AsideMenu />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </main>
  )
}
