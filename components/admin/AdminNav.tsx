import React from "react"
import Link from "next/link"
import { LogOut, LayoutDashboard, Video } from "lucide-react"
import { auth, signOut } from "@/auth"

export async function AdminNav() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/admin/dashboard"
            className="text-xl font-bold tracking-widest text-brand-100 uppercase"
          >
            Thresh<span className="text-brand-500">Admin</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-100"
            >
              <Video className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-100"
            >
              Settings
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-neutral-500 md:inline-block">
            {session?.user?.email}
          </span>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/admin/login" })
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
