'use client'

import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
      <p>
        <strong>User logger with email: </strong>
        {session?.user?.email}
      </p>
      <p>
        <strong>Name: </strong>
        {session?.user?.name}
      </p>
    </>
  )
}
