'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AsideMenu() {
  const pathname = usePathname()
  return (
    <aside className="hidden h-full w-52 border-r-2 p-5 md:flex flex-col space-y-4">
      <span className="font-bold text-2xl text-zinc-400 text-center flex justify-center flex-col items-center">
        <Image
          src="/logo.png"
          width={0}
          height={0}
          alt="Logo icon"
          className="w-20 h-20"
          unoptimized
        />
        HW CARTS
      </span>

      <ul className="text-base font-medium dark:text-foreground text-zinc-700">
        <Link href="/dashboard/home">
          <li
            className={`dark:hover:bg-zinc-900 hover:bg-zinc-300 transition-all duration-300 rounded-md p-2 hover:cursor-pointer mb-1 ${pathname.endsWith('/home') && 'bg-zinc-900'}`}
          >
            Home
          </li>
        </Link>
        <Link href="/dashboard/collection">
          <li
            className={`dark:hover:bg-zinc-900 hover:bg-zinc-300 transition-all duration-300 rounded-md p-2 hover:cursor-pointer ${pathname.endsWith('/collection') && 'bg-zinc-900'}`}
          >
            Coleção
          </li>
        </Link>
      </ul>
    </aside>
  )
}
