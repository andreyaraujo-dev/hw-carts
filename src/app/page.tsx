'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export default function Home() {
  return (
    <main className="flex items-center w-screen h-screen justify-center">
      <aside className="h-full w-1/2 p-5 flex flex-col justify-center text-start">
        <h1 className="text-4xl font-bold text-start text-blue-800">
          HW Carts
        </h1>
        <p className="text-xl">
          Gerencie a sua coleção de carrinhos da HotWheels.
        </p>
        <p className="text-lg text-slate-500">
          Tenha sua coleção na palma da sua mão.
        </p>
      </aside>
      <aside className="h-full w-1/2 p-5 flex items-center justify-center bg-slate-900">
        <Button onClick={() => signIn('google', { callbackUrl: '/home' })}>
          Entrar com uma conta google
        </Button>
      </aside>
    </main>
  )
}
