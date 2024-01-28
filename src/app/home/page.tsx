'use client'

import { ToggleTheme } from '@/components/ToggleTheme'
import { Card, CardContent } from '@/components/ui/card'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <main className="flex w-screen h-screen">
      <aside className="h-full w-52 border-r-2 border-r-slate-900 p-5 flex flex-col space-y-4">
        <span className="font-bold text-2xl">HW CARTS</span>

        <ul className="text-base font-medium text-slate-300">
          <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
            Home
          </li>
          <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
            Coleção
          </li>
          <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
            Favoritos
          </li>
        </ul>
      </aside>
      <aside className="p-5 w-full">
        <header className="flex items-center justify-end mb-10">
          <span className="mr-3">
            Olá, <span className="text-blue-800">{session?.user?.name}</span>
          </span>
          <ToggleTheme />
        </header>

        <div className="w-full p-5">
          <h2 className="font-bold text-2xl mb-3">Favoritos</h2>

          <div className="flex items-center space-x-3">
            <Card>
              <CardContent className="flex">
                <div
                  className="w-2/5 h-full bg-no-repeat bg-cover bg-center bg-fixed"
                  style={{
                    backgroundImage: `url(https://i.pinimg.com/originals/ac/34/84/ac348422c1fd4d46f9a652f32839f8d6.jpg)`
                  }}
                />

                <section className="flex flex-col justify-start p-2 flex-1">
                  <p>
                    <strong>Modelo: </strong>modelo
                  </p>
                  <p>
                    <strong>Ano: </strong>1990
                  </p>
                  <p>
                    <strong>Data de compra: </strong>12/08/2002
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
    </main>
  )
}
