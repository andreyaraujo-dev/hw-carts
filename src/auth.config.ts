import type { NextAuthConfig } from 'next-auth'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

export const authConfig = {
  pages: {
    signIn: '/'
  },
  session: {
    strategy: 'jwt',
    maxAge: 86400 // 1 dia
  },
  secret: jwtSecret,
  debug: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
    async jwt({ token, account }) {
      if (account) {
        token.access_token = jwt.sign(token, jwtSecret as string, {
          algorithm: 'HS256',
          expiresIn: '1d'
        })
      }

      return token
    },
    async session({ session, token }) {
      session.access_token = token.access_token
      return session
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig
