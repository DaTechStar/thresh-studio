"use client"

import React, { useRef } from "react"
import { gsap, useGSAP } from "@/lib/gsap"
import Image from "next/image"
import { PageSkeleton } from "@/components/shared/PageSkeleton"
import { useSettings } from "@/hooks/useSettings"

export function TrustedBy() {
  const { data, isLoading } = useSettings()
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!marqueeRef.current) return
      gsap.fromTo(
        marqueeRef.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 30,
          repeat: -1,
          ease: "none",
        }
      )
    },
    { dependencies: [isLoading, data] }
  )

  if (isLoading) {
    return (
      <section className="bg-background px-4 py-24 md:px-8">
        <PageSkeleton variant="table" />
      </section>
    )
  }

  const rawBrands = data?.trustedBrands || []
  const activeBrands = rawBrands
    .filter((b) => b.isActive)
    .sort((a, b) => a.order - b.order)

  if (activeBrands.length === 0) return null

  // Duplicate brands heavily to ensure it overflows the screen and loops perfectly seamlessly
  const displayBrands = Array(8).fill(activeBrands).flat()

  return (
    <section className="overflow-hidden bg-background py-12">
      <div className="mx-auto mb-8 max-w-[1400px] px-4 md:px-8">
        <h2 className="text-center text-sm font-bold tracking-[0.2em] text-neutral-300 uppercase md:text-left">
          Trusted By
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden py-8">
        <div ref={marqueeRef} className="flex w-max items-center">
          {displayBrands.map((client, i) => (
            <div
              key={i}
              className="flex flex-shrink-0 items-center justify-center pr-20 md:pr-40"
            >
              {client.logoUrl ? (
                <div className="relative max-h-20 max-w-[250px] md:max-h-32 md:max-w-[350px]">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={250}
                    height={100}
                    className="h-full w-full object-contain drop-shadow-xl"
                  />
                </div>
              ) : (
                <span className="text-5xl font-black tracking-tighter text-white drop-shadow-lg md:text-8xl">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
