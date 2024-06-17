// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session } from 'next-auth'

declare module 'next-auth' {
  // Extend session to hold the access_token
  interface Session {
    access_token: string & DefaultSession
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT {
    access_token: string & DefaultJWT
  }
}
