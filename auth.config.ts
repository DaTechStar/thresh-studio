import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/admin")
      const isLoginRoute = nextUrl.pathname === "/admin/login"

      if (isAdminRoute) {
        if (isLoginRoute) {
          if (isLoggedIn)
            return Response.redirect(new URL("/admin/dashboard", nextUrl))
          return true // Let them see the login page
        }
        if (isLoggedIn) return true // Let them access protected routes
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isLoginRoute) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
