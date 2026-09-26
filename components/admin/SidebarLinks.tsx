"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Video,
  Settings,
  ExternalLink,
  MessageSquare,
} from "lucide-react"

export function SidebarLinks() {
  const pathname = usePathname()

  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      disabled: false,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: Video,
      disabled: false,
    },
    {
      name: "Testimonials",
      href: "/admin/testimonials",
      icon: MessageSquare,
      disabled: false,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      disabled: false,
    },
  ]

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto p-4">
      <div className="mt-2 mb-4 px-3 text-[10px] font-bold tracking-[0.2em] text-neutral-600 uppercase">
        Menu
      </div>

      {links.map((link) => {
        // Simple active check
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`)

        return (
          <Link
            key={link.name}
            href={link.disabled ? "#" : link.href}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-300 ${
              link.disabled ? "pointer-events-none opacity-40" : ""
            } ${
              isActive
                ? "bg-brand-500/15 text-brand-200"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100"
            }`}
          >
            {isActive && (
              <div className="absolute top-2 bottom-2 left-0 w-1 rounded-r-full bg-brand-200" />
            )}
            <link.icon
              className={`h-4 w-4 ${isActive ? "text-brand-200" : "text-neutral-500 transition-colors group-hover:text-neutral-300"}`}
            />
            <span className="text-sm font-medium tracking-wide">
              {link.name}
            </span>
            {link.disabled && (
              <span className="ml-auto rounded-full bg-neutral-800 px-2 py-0.5 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                Soon
              </span>
            )}
          </Link>
        )
      })}

      <div className="mt-8 mb-4">
        <div className="mb-4 px-3 text-[10px] font-bold tracking-[0.2em] text-neutral-600 uppercase">
          External
        </div>
        <a
          href="/"
          target="_blank"
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-400 transition-all duration-300 hover:bg-neutral-900 hover:text-neutral-100"
        >
          <ExternalLink className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-neutral-300" />
          <span className="text-sm font-medium tracking-wide">
            View Live Site
          </span>
        </a>
      </div>
    </nav>
  )
}
