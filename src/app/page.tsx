'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="flex flex-col items-center w-screen h-screen justify-center bg-gradient-to-tr from-zinc-900 to-zinc-700">
      <div className="text-center flex items-center flex-col">
        <h1 className="text-4xl font-bold text-start text-zinc-400">
          HW Carts
        </h1>
        <p className="text-xl">
          Gerencie a sua coleção de carrinhos da HotWheels.
        </p>
        <p className="text-lg text-zinc-500">
          Tenha sua coleção na palma da sua mão.
        </p>
      </div>
      <div className="mt-5">
        <Button
          onClick={() => signIn('google', { callbackUrl: '/dashboard/home' })}
          className="text-zinc-200 dark:text-zinc-900 font-bold"
        >
          <Image
            src="/google.png"
            width={0}
            height={0}
            alt="Google icon"
            className="w-4 h-4 mr-2"
          />
          Entrar com uma conta google
        </Button>
      </div>
    </main>
  )
}
