"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { useCursor } from "../cursor/CursorContext"
import { gsap, useGSAP } from "@/lib/gsap"
import { motion } from "motion/react"
import { useSettings } from "@/hooks/useSettings"

export function Footer() {
  const { setCursorState } = useCursor()
  const container = useRef<HTMLElement>(null)
  const { data } = useSettings()

  useGSAP(
    () => {
      if (!container.current) return

      // Simple parallax effect for the massive text at the bottom
      gsap.fromTo(
        ".footer-logo",
        { y: -150, opacity: 0.5 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      )
    },
    { scope: container }
  )

  return (
    <footer
      ref={container}
      className="sticky bottom-0 left-0 z-0 flex min-h-screen w-full flex-col justify-between overflow-hidden bg-background px-4 pt-32 pb-8 text-neutral-100 md:px-16"
    >
      {/* Dynamic Aurora / Mesh Gradient Background (Living & Moving) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-100">
        <div className="absolute inset-0 bg-background" />{" "}
        {/* Base background */}
        {/* Creative Pattern Overlay (Subtle Grid) */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-brand-300) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Bright Cyan Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "-10%", "5%", "0%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] h-[60vw] w-[60vw] rounded-full bg-brand-200/20 mix-blend-screen blur-[120px]"
        />
        {/* Mid Teal Orb */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: ["0%", "-10%", "15%", "0%"],
            y: ["0%", "10%", "-5%", "0%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[0%] h-[50vw] w-[50vw] rounded-full bg-brand-400/30 mix-blend-screen blur-[140px]"
        />
        {/* Very Dark Cyan Orb for contrast depth */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1.4, 1],
            x: ["0%", "10%", "-15%", "0%"],
            y: ["0%", "-5%", "15%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[20%] h-[80vw] w-[80vw] rounded-full bg-brand-600/60 mix-blend-screen blur-[150px]"
        />
        {/* Brightest Brand Accent for intersection glow */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: ["0%", "-20%", "5%", "0%"],
            y: ["0%", "20%", "-10%", "0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-10%] bottom-[-10%] h-[40vw] w-[40vw] rounded-full bg-brand-100/10 mix-blend-screen blur-[130px]"
        />
      </div>

      {/* Top Section - Clean vertical stack */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-2xl flex-1 flex-col">
        {/* Navigation and Socials (Top right aligned on desktop, left on mobile) */}
        <div className="mb-24 flex w-full flex-col items-start justify-between md:mb-32 md:flex-row">
          <div className="mb-16 md:mb-0">
            <p className="font-mono text-sm tracking-[0.3em] text-brand-300 uppercase md:text-base">
              Start a Project
            </p>
          </div>

          <div className="flex flex-row gap-16 font-mono text-sm tracking-[0.2em] uppercase md:gap-32">
            <div className="flex flex-col gap-6">
              <span className="mb-2 text-neutral-400">Menu</span>
              <Link
                href="/work"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                Work
              </Link>
              <Link
                href="/#process"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                Process
              </Link>
              <Link
                href="/#capabilities"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                Capabilities
              </Link>
            </div>

            <div className="flex flex-col gap-6 text-left">
              <span className="mb-2 text-neutral-400">Contact</span>
              <a
                href="mailto:hello@thresh.studio"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                Email Us
              </a>
              <a
                href="mailto:hello@thresh.studio"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>

        {/* Massive Call to action */}
        <div className="flex w-full flex-col items-start">
          <a
            href="mailto:hello@thresh.studio"
            className="group relative inline-flex w-full cursor-none flex-col"
            onMouseEnter={() => setCursorState("magnetic")}
            onMouseLeave={() => setCursorState("default")}
          >
            {/* Responsively scaled to fit perfectly */}
            <span className="text-[6vw] font-bold tracking-tighter uppercase transition-colors group-hover:text-brand-200 md:text-[5vw]">
              hello@thresh.studio
            </span>
            <div className="relative mt-2 h-[2px] w-full overflow-hidden bg-neutral-600">
              <div className="absolute top-0 left-0 h-full w-full -translate-x-full bg-brand-300 transition-transform duration-700 ease-out group-hover:translate-x-0" />
            </div>
          </a>
        </div>
      </div>

      {/* Massive Brand Mark at the bottom */}
      <div className="relative z-10 mt-auto flex w-full flex-col items-center justify-end overflow-hidden pt-24">
        <img
          src="/logo.png"
          alt="Thresh Studio"
          className="footer-logo h-auto w-[80vw] object-contain opacity-80 mix-blend-plus-lighter md:w-[60vw]"
        />

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-8 font-mono text-xs tracking-[0.2em] text-neutral-400 uppercase md:flex-row md:text-sm">
          <p className="w-full text-center md:w-1/3 md:text-left">
            © 2026 THRESH STUDIO LLC
          </p>

          <div className="flex w-full justify-center gap-6 md:w-1/3 md:gap-10">
            {data?.instagramUrl && (
              <a
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                Instagram
              </a>
            )}
            {data?.linkedinUrl && (
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                LinkedIn
              </a>
            )}
            {data?.vimeoUrl && (
              <a
                href={data.vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                Vimeo
              </a>
            )}
            {data?.twitterUrl && (
              <a
                href={data.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none text-neutral-100 transition-colors hover:text-brand-300"
                onMouseEnter={() => setCursorState("magnetic")}
                onMouseLeave={() => setCursorState("default")}
              >
                X
              </a>
            )}
          </div>

          <p className="w-full text-center text-brand-300 md:w-1/3 md:text-right">
            Product Branding & Cinematic Marketing
          </p>
        </div>
      </div>
    </footer>
  )
}
