import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// Next.js 16 Edge Middleware is now configured via proxy.ts
export default NextAuth(authConfig).auth

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
