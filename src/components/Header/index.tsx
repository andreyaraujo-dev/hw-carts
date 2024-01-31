'use client'

import { useSession } from 'next-auth/react'
import { ToggleTheme } from '../ToggleTheme'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex items-center justify-end p-6">
      <span className="mr-3">
        Olá, <span className="text-blue-800">{session?.user?.name}</span>
      </span>
      <ToggleTheme />
    </header>
  )
}
