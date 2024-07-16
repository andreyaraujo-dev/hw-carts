'use client'

import { signOut, useSession } from 'next-auth/react'
import { ToggleTheme } from '../ToggleTheme'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'
import { Menu, MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

export function Header() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="flex items-center p-6 border-b">
      <div className="hidden md:flex md:items-center md:space-x-3 md:justify-between w-full">
        <div className="flex space-x-2">
          <Avatar>
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>
              {session?.user?.name?.split(' ')[0].split('')[0]}
              {session?.user?.name?.split(' ')[1].split('')[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{session?.user?.name?.split(' ')[0]}</span>
            <span className="text-zinc-500 text-sm">
              {session?.user?.name?.split(' ')[1]}
            </span>
          </div>
        </div>
        <div className="md:flex md:items-center md:space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => router.push('/dashboard/profile')}
              >
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ToggleTheme />
        </div>
      </div>

      <div className="md:hidden flex justify-between w-full items-center">
        <span className="font-bold text-2xl text-zinc-300 flex items-center space-x-2">
          <Image
            src="/logo.png"
            width={0}
            height={0}
            alt="Logo icon"
            className="w-14 h-1w-14"
            unoptimized
          />
          <span>HW CARTS</span>
        </span>

        <Sheet open={open} onOpenChange={() => setOpen(!open)}>
          <SheetTrigger className="md:hidden">
            <div
              className="p-2 border rounded-md hover:bg-slate-900 transition-all duration-300 hover:cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <MenuIcon size={24} />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-10">
              <SheetTitle>
                <span className="text-sm">
                  Olá,{' '}
                  <span className="text-blue-800">{session?.user?.name}</span>
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col justify-between h-[90%]">
              <ul className="text-base font-medium text-slate-300">
                <Link href="/dashboard/home" onClick={() => setOpen(false)}>
                  <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
                    Home
                  </li>
                </Link>
                <Link
                  href="/dashboard/collection"
                  onClick={() => setOpen(false)}
                >
                  <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
                    Coleção
                  </li>
                </Link>

                <Link href="/dashboard/profile" onClick={() => setOpen(false)}>
                  <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
                    Perfil
                  </li>
                </Link>

                <li
                  className="p-2"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sair
                </li>

                <li className="p-2">
                  <ToggleTheme />
                </li>
              </ul>

              <div className="w-full text-center">
                <span className="text-xs">
                  Criado e desenvolvido por Andrey Araújo -{' '}
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
