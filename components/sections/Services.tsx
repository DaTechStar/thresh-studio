"use client"

import React, { useState, useRef, useEffect } from "react"
import { useCursor } from "../cursor/CursorContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap"

const services = [
  {
    id: "01",
    name: "Product Branding",
    desc: "We craft cohesive visual languages and identities that position your product as a premium leader in its market.",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: "02",
    name: "Marketing Video",
    desc: "Cinematic, high-fidelity campaigns and showreels designed to captivate audiences and drive conversions.",
    image:
      "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: "03",
    name: "3D Motion",
    desc: "Hyper-realistic product modeling, abstract simulations, and physics-based animations for product reveals.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: "04",
    name: "Visual Effects",
    desc: "High-end post-production, color grading, and VFX that elevate your product marketing videos to a cinematic standard.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2560&auto=format&fit=crop",
  },
]

function ServiceAccordion({
  service,
  isActive,
}: {
  service: (typeof services)[0]
  isActive: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const { setCursorState } = useCursor()

  useEffect(() => {
    if (!contentRef.current) return
    if (isActive) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
      })
    }
  }, [isActive])

  return (
    <div
      className={cn(
        "group relative flex cursor-none flex-col overflow-hidden border-b border-neutral-900 transition-colors duration-700",
        isActive ? "bg-transparent" : ""
      )}
      onMouseEnter={() => setCursorState("explore")}
      onMouseLeave={() => setCursorState("default")}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-brand-500/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex items-center gap-6 px-2 py-5 md:gap-8 md:px-6 md:py-8">
        <span
          className={cn(
            "font-mono text-[10px] transition-colors duration-500 md:text-xs",
            isActive
              ? "text-brand-300 drop-shadow-[0_0_10px_rgba(0,211,218,0.5)]"
              : "text-neutral-700 group-hover:text-brand-500"
          )}
        >
          {service.id}
        </span>
        <h3
          className={cn(
            "text-2xl font-bold tracking-tighter uppercase transition-colors duration-500 md:text-4xl",
            isActive
              ? "text-neutral-100"
              : "text-neutral-600 group-hover:text-neutral-300"
          )}
        >
          {service.name}
        </h3>
      </div>

      <div
        ref={contentRef}
        className="h-0 overflow-hidden px-2 opacity-0 md:px-6"
      >
        <div className="flex flex-col items-start gap-6 pb-6 md:flex-row">
          <div className="relative h-[20vh] w-full overflow-hidden rounded-xl shadow-2xl md:h-[25vh] md:w-1/2">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="scale-105 object-cover transition-all duration-1000 hover:mix-blend-normal md:mix-blend-luminosity"
            />
            <div className="pointer-events-none absolute inset-0 bg-brand-700/20 mix-blend-overlay" />
          </div>

          <div className="flex h-full w-full flex-col justify-end md:w-1/2">
            <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
              {service.desc}
            </p>
            <Link
              href={`/work?category=${service.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="mt-4 block w-fit rounded-full border border-brand-500/30 px-4 py-2 text-center font-mono text-[10px] tracking-[0.2em] text-brand-200 uppercase transition-colors hover:bg-brand-500/10 md:mt-6 md:px-6 md:py-3"
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("explore")}
            >
              Explore {service.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Services() {
  const [activeService, setActiveService] = useState<string>("01")
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const index = Math.min(
            services.length - 1,
            Math.floor(self.progress * services.length)
          )
          setActiveService(services[index].id)
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative h-[400vh] w-full border-t border-neutral-800 bg-background"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden px-4 py-20 md:px-16">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_50%,var(--color-brand-700)_0%,transparent_70%)] opacity-20" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-2xl flex-col items-center gap-12 md:flex-row md:gap-24">
          <div className="flex h-fit flex-col md:w-1/3">
            <h2 className="text-[12vw] leading-[0.85] font-bold tracking-[-0.04em] text-neutral-100 uppercase md:text-[6vw]">
              Our <br />
              Capabilities
            </h2>
            <p className="mt-8 border-l-2 border-brand-500/50 py-2 pl-4 font-mono text-[10px] tracking-[0.3em] text-brand-300 uppercase opacity-80 md:mt-12 md:text-xs">
              The tools we use to craft <br />
              premium product marketing videos.
            </p>
          </div>

          <div className="mt-8 flex w-full flex-col md:mt-0 md:w-2/3">
            {services.map((service) => (
              <ServiceAccordion
                key={service.id}
                service={service}
                isActive={activeService === service.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
