"use client"

import React, { useRef } from "react"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"
import { useCursor } from "../cursor/CursorContext"

const testimonials = [
  {
    quote:
      "Thresh didn't just brand our product. They completely changed how our users experience it. An absolute masterclass in digital storytelling. Which nobody out there does among competitors.",
    author: "Sarah Jenkins",
    role: "VP Marketing @ Lumina",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2560&auto=format&fit=crop",
  },
  {
    quote:
      "The 3D motion work they delivered was nothing short of cinematic. It elevated our campaign from a standard product launch to a visual event.",
    author: "Marcus Chen",
    role: "Creative Director",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2560&auto=format&fit=crop",
  },
  {
    quote:
      "Working with this studio felt less like hiring an agency and more like partnering with a high-end film production crew. The attention to detail is insane.",
    author: "Elena Rodriguez",
    role: "Founder @ Chronos",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2560&auto=format&fit=crop",
  },
]

export function Testimonials() {
  const container = useRef<HTMLDivElement>(null)
  const { setCursorState } = useCursor()

  useGSAP(
    () => {
      if (!container.current) return
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card")
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        // Desktop: Pinned stacked cards
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: `+=${cards.length * 100}%`,
            pin: true,
            scrub: 1,
          },
        })

        // Initial setup: stack them all correctly, with background cards hidden
        gsap.set(cards, {
          transformOrigin: "center center",
        })

        cards.forEach((card, i) => {
          if (i > 0) {
            gsap.set(card, { y: -50, scale: 0.95, opacity: 0 }) // Hidden initially, above the stack
          }
        })

        cards.forEach((card, index) => {
          if (index === cards.length - 1) return // Last card stays

          // 1. Current card falls DOWN and fades out
          tl.to(
            card,
            {
              y: 100,
              opacity: 0,
              scale: 1.05,
              duration: 1,
              ease: "power1.inOut",
            },
            index
          )

          // 2. Next card smoothly falls DOWN into place
          const nextCard = cards[index + 1]
          tl.to(
            nextCard,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",
            },
            index
          )
        })
      })

      mm.add("(max-width: 767px)", () => {
        // Mobile: Simple scroll reveal
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          )
        })
      })
    },
    { scope: container }
  )

  return (
    <section
      ref={container}
      id="testimonials"
      className="relative flex w-full flex-col border-t border-neutral-800 bg-background md:h-screen md:overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-20 flex shrink-0 flex-col items-center px-4 pt-16 text-center md:px-16 md:pt-24">
        <h2 className="mb-4 font-mono text-sm tracking-[0.3em] text-brand-300 uppercase">
          Client Feedback
        </h2>
        <p className="text-4xl font-bold tracking-tighter text-neutral-100 uppercase md:text-6xl">
          Don&apos;t just take our word for it.
        </p>
      </div>

      {/* Cards Container */}
      <div
        className="relative z-10 mx-auto mt-16 flex h-auto w-full max-w-5xl flex-col gap-6 px-4 pb-20 perspective-[1000px] md:mt-24 md:block md:h-[60vh] md:cursor-none md:px-0 md:pb-0"
        onMouseEnter={() => {
          if (window.innerWidth >= 768) setCursorState("explore")
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) setCursorState("default")
        }}
      >
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="testimonial-card relative top-0 left-0 flex h-auto w-full flex-col overflow-hidden rounded-[2rem] border border-brand-500/50 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:absolute md:h-full md:flex-row"
            style={{ zIndex: testimonials.length - i }}
          >
            {/* Strong Black to Brand Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-black to-brand-500 opacity-95" />

            {/* Bold Top-Left Glow for depth */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_0%_0%,_var(--tw-gradient-stops))] from-brand-300/40 via-transparent to-transparent" />

            {/* Inner Content */}
            <div className="relative z-10 flex h-full w-full flex-col gap-8 p-8 md:flex-row md:gap-16 md:p-16">
              {/* Left Column (Avatar, Name, Rating) */}
              <div className="flex w-full flex-col items-start border-brand-500/20 md:w-1/3 md:border-r md:pr-12">
                <div className="relative mb-6 h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-2xl md:mb-10 md:h-24 md:w-24">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="absolute inset-0 h-full w-full object-cover md:mix-blend-luminosity"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-brand-500/40 mix-blend-color" />
                </div>

                <h4 className="text-xl font-bold text-neutral-100 md:text-2xl">
                  {testimonial.author}
                </h4>
                <p className="mt-2 mb-6 font-mono text-[10px] tracking-[0.2em] text-brand-300 uppercase opacity-80 md:mb-10 md:text-xs">
                  {testimonial.role}
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <span className="text-xl font-bold text-neutral-100">
                    5.0
                  </span>
                  <div className="flex gap-1 text-sm text-brand-400">
                    ★ ★ ★ ★ ★
                  </div>
                </div>
              </div>

              {/* Right Column (Quote, Buttons) */}
              <div className="flex w-full flex-col justify-center md:w-2/3">
                <div>
                  <div className="mb-4 font-serif text-5xl leading-none text-brand-500/30 md:mb-6 md:text-7xl">
                    &ldquo;
                  </div>
                  <p className="text-xl leading-tight font-medium tracking-tight text-neutral-200 md:text-3xl">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
