"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export function AdminBackground() {
  const blobRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!blobRef.current || !bgRef.current) return

        const { clientX, clientY } = e

        // Calculate normalized position (-1 to 1) relative to center of screen
        const xPos = (clientX / window.innerWidth - 0.5) * 2
        const yPos = (clientY / window.innerHeight - 0.5) * 2

        // Move the blob smoothly
        gsap.to(blobRef.current, {
          x: xPos * 120, // max 120px movement
          y: yPos * 120,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
        })

        // Move the large background glow slightly in opposite direction for parallax
        gsap.to(bgRef.current, {
          x: xPos * -40,
          y: yPos * -40,
          duration: 3,
          ease: "power2.out",
          overwrite: "auto",
        })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Cinematic Glowing Background Gradients */}
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 z-0 scale-110 bg-[radial-gradient(circle_at_50%_0%,var(--color-brand-600)_0%,transparent_50%)] opacity-40 mix-blend-screen will-change-transform"
      />

      {/* Interactive Glowing Blob */}
      <div
        ref={blobRef}
        className="pointer-events-none fixed top-[10%] left-[20%] z-0 hidden h-[50vw] w-[50vw] rounded-full bg-brand-500/20 mix-blend-screen blur-[120px] will-change-transform md:block"
      />

      {/* Glowing top accent */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-brand-500/80 to-transparent shadow-[0_0_15px_rgba(0,211,218,0.5)]" />
    </>
  )
}
