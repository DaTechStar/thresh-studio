"use client"

import React, { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import Image from "next/image"
import { useCursor } from "../cursor/CursorContext"
import { useTestimonials } from "@/hooks/useTestimonials"
import { Skeleton } from "@/components/ui/skeleton"

export function Testimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials()
  const container = useRef<HTMLDivElement>(null)
  const { setCursorState } = useCursor()

  useGSAP(
    () => {
      if (!container.current || isLoading || testimonials.length === 0) return
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card")
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
        if (testimonials.length <= 1) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom bottom",
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
          tl.fromTo(
            card,
            { y: 0, scale: 1, opacity: 1 },
            {
              y: 100,
              opacity: 0,
              scale: 1.05,
              duration: 1,
              ease: "power1.inOut",
              immediateRender: false,
            },
            index
          )

          // 2. Next card smoothly falls DOWN into place
          const nextCard = cards[index + 1]
          tl.fromTo(
            nextCard,
            { y: -50, scale: 0.95, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",
              immediateRender: false,
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
    { scope: container, dependencies: [isLoading, testimonials.length] }
  )

  if (isLoading) {
    return (
      <section className="relative w-full border-t border-neutral-800 bg-background py-24 md:py-32">
        <div className="relative z-20 flex shrink-0 flex-col items-center px-4 text-center md:px-16">
          <Skeleton className="mb-4 h-4 w-32 bg-neutral-800" />
          <Skeleton className="h-12 w-3/4 max-w-2xl bg-neutral-800 md:h-16" />
        </div>
        <div className="mx-auto mt-16 max-w-5xl px-4 md:mt-24">
          <div className="h-auto w-full rounded-[2rem] border border-neutral-800 bg-neutral-900/50 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:h-[60vh] md:p-16">
            <div className="flex h-full flex-col gap-8 md:flex-row md:gap-16">
              <div className="flex w-full flex-col items-start border-neutral-800 md:w-1/3 md:border-r md:pr-12">
                <Skeleton className="mb-6 h-20 w-20 rounded-full bg-neutral-800 md:mb-10 md:h-24 md:w-24" />
                <Skeleton className="mb-2 h-6 w-48 bg-neutral-800" />
                <Skeleton className="h-4 w-32 bg-neutral-800" />
              </div>
              <div className="flex w-full flex-col justify-center md:w-2/3">
                <Skeleton className="h-32 w-full bg-neutral-800" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  return (
    <section
      ref={container}
      id="testimonials"
      className={`relative w-full border-t border-neutral-800 bg-background ${
        testimonials.length > 1 ? "md:h-[300vh]" : "md:h-auto md:py-32"
      }`}
    >
      <div
        className={`flex h-auto w-full flex-col ${
          testimonials.length > 1
            ? "md:sticky md:top-0 md:h-screen md:overflow-hidden"
            : ""
        }`}
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
          className={`relative z-10 mx-auto mt-16 flex h-auto w-full max-w-5xl flex-col gap-6 px-4 pb-20 perspective-[1000px] md:mt-24 ${
            testimonials.length > 1
              ? "md:block md:h-[60vh] md:cursor-none md:px-0 md:pb-0"
              : ""
          }`}
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
              className={`testimonial-card relative top-0 left-0 flex h-auto w-full flex-col overflow-hidden rounded-[2rem] border border-brand-500/50 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.6)] md:flex-row ${
                testimonials.length > 1
                  ? "md:absolute md:h-full"
                  : "md:min-h-[60vh]"
              }`}
              style={{ zIndex: testimonials.length - i }}
            >
              {/* Strong Black to Brand Background */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-black to-brand-500 opacity-95" />

              {/* Bold Top-Left Glow for depth */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_0%_0%,_var(--tw-gradient-stops))] from-brand-300/40 via-transparent to-transparent" />

              {/* Inner Content */}
              <div className="relative z-10 flex h-full w-full flex-col gap-8 p-8 md:flex-row md:gap-16 md:p-16">
                {/* Left Column (Avatar, Name, Rating) */}
                <div className="flex w-full flex-col items-start justify-center border-brand-500/20 md:w-1/3 md:border-r md:pr-12">
                  {testimonial.avatar && (
                    <div className="relative mb-6 h-20 w-20 shrink-0 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 shadow-2xl md:mb-8 md:h-24 md:w-24">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        sizes="(max-width: 768px) 5rem, 6rem"
                        className="absolute inset-0 object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="text-xl font-bold text-neutral-100 md:text-2xl">
                      {testimonial.author}
                    </h4>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-brand-300 uppercase opacity-80 md:text-xs">
                      {testimonial.role}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-4 md:mt-8">
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
      </div>
    </section>
  )
}
