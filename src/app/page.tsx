'use client'

import { Button } from '@/shared/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export default function Login() {
  return (
    <main className="flex md:flex-row flex-col items-center w-screen h-screen justify-center">
      <div className="hidden md:flex flex-col md:w-8/12 h-full bg-[url('/bg-login.png')] bg-no-repeat bg-bottom justify-center bg-contain p-14">
        <h1 className="text-6xl font-medium text-start text-zinc-200">
          Gerencie sua coleção de carrinhos da Hot Wheels.
        </h1>
        <p className="text-2xl text-zinc-500 font-medium">
          Tenha sua coleção na palma da sua mão.
        </p>
      </div>
      <div className="md:flex-1 w-full h-full flex items-center justify-center flex-col bg-zinc-900 p-10">
        <div className="flex flex-col space-y-4 h-[90%] justify-center text-center">
          <span>
            <Image
              src="/logo.png"
              width={0}
              height={0}
              alt="Logo icon"
              className="w-64 h-56 m-auto"
              unoptimized
            />
          </span>
          <h1 className="text-6xl font-bold text-zinc-100">HW Carts</h1>
          <div className="md:hidden flex w-full flex-col">
            <p className="text-2xl font-medium text-zinc-300">
              Gerencie sua coleção de carrinhos da Hot Wheels.
            </p>
            <p className="text-xl text-zinc-500 font-medium">
              Tenha sua coleção na palma da sua mão.
            </p>
          </div>
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

        <span className="text-zinc-400 font-normal text-xs mt-auto">
          <a
            href="http://andreyaraujo.dev"
            target="_blank"
            className="hover:underline"
          >
            Andrey Araújo
          </a>
          {' - '}
          {new Date().getFullYear()}
        </span>
      </div>
    </main>
  )
}
