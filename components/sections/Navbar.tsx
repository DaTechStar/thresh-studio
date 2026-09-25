"use client"

import React, { useState, useEffect } from "react"
import { useCursor } from "../cursor/CursorContext"
import { cn } from "@/lib/utils"
import { useLenis } from "lenis/react"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { setCursorState } = useCursor()
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault()
      lenis?.scrollTo(href.replace("/", ""))
    }
  }

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Capabilities", href: "/#capabilities" },
    { name: "Process", href: "/#process" },
    { name: "Testimonials", href: "/#testimonials" },
  ]

  return (
    <header className="absolute top-0 left-0 z-[100] flex w-full justify-center px-4 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 rounded-full border border-brand-500/20 bg-background/20 px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md md:px-8 md:py-4 lg:px-10">
        {/* Logo (Original Color, no mix-blend/invert) */}
        <Link
          href="/"
          className="group relative z-10 flex cursor-none items-center justify-center"
          onMouseEnter={() => setCursorState("magnetic")}
          onMouseLeave={() => setCursorState("default")}
        >
          <img
            src="/logo.png"
            alt="Thresh Studio"
            className="h-6 w-auto transition-transform duration-700 group-hover:scale-105 md:h-8"
          />
        </Link>

        {/* Center Links (Sleek, bright white, premium spacing) */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-16">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative cursor-none font-mono text-xs tracking-[0.3em] text-neutral-100 uppercase transition-colors duration-500 hover:text-brand-200"
              onMouseEnter={() => setCursorState("magnetic")}
              onMouseLeave={() => setCursorState("default")}
            >
              {link.name}
              {/* Subtle underline that grows from center */}
              <span className="absolute -bottom-2 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-brand-200 opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        {/* Right CTA (Sharp, minimalistic button) */}
        <div className="flex shrink-0 items-center">
          <a
            href="mailto:hello@thresh.studio"
            className="group relative flex cursor-none items-center justify-center overflow-hidden rounded-full border border-neutral-700 px-5 py-3 transition-colors duration-700 hover:border-brand-300 md:px-8 md:py-4"
            onMouseEnter={() => setCursorState("magnetic")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="absolute inset-0 translate-y-[101%] bg-brand-500/20 transition-transform duration-700 ease-[0.76,0,0.24,1] group-hover:translate-y-0" />
            <span className="relative z-10 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap text-neutral-100 uppercase transition-colors duration-300 group-hover:text-brand-100 md:text-xs">
              Start Project
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
