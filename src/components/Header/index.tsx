'use client'

import { useSession } from 'next-auth/react'
import { ToggleTheme } from '../ToggleTheme'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'
import { MenuIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <header className="flex items-center justify-end p-6">
      <div className="hidden md:block">
        <span className="mr-3">
          Olá, <span className="text-blue-800">{session?.user?.name}</span>
        </span>
        <ToggleTheme />
      </div>

      <div className="md:hidden flex justify-between w-full items-center">
        <span className="font-bold text-2xl text-blue-800">HW CARTS</span>

        <Sheet open={open}>
          <SheetTrigger className="md:hidden">
            <Button
              variant="outline"
              className="px-2"
              onClick={() => setOpen(true)}
            >
              <MenuIcon size={24} />
            </Button>
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
                <Link href="/home" onClick={() => setOpen(false)}>
                  <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
                    Home
                  </li>
                </Link>
                <Link href="/collection" onClick={() => setOpen(false)}>
                  <li className="hover:bg-slate-900 transition-all duration-300 rounded-md p-2 hover:cursor-pointer">
                    Coleção
                  </li>
                </Link>

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
