"use client"

import React from "react"
import { motion } from "motion/react"
import { PageSkeleton } from "@/components/shared/PageSkeleton"
import { useSettings } from "@/hooks/useSettings"

export function TrustedBy() {
  const { data, isLoading } = useSettings()

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

  return (
    <section className="overflow-hidden bg-background py-12">
      <div className="mx-auto mb-8 max-w-[1400px] px-4 md:px-8">
        <h2 className="text-center text-sm font-bold tracking-[0.2em] text-neutral-300 uppercase md:text-left">
          Trusted By
        </h2>
      </div>

      {/* 
        This container animates exactly the items uploaded. 
        It starts off-screen to the left (-100% of its own width), 
        and animates to off-screen right (100vw).
      */}
      <div className="relative w-full overflow-hidden py-8">
        <motion.div
          className="flex w-max items-center gap-20 md:gap-40"
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{
            duration: 20, // Adjust this value to make it faster/slower
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {activeBrands.map((client, i) => (
            <div
              key={i}
              className="flex flex-shrink-0 items-center justify-center"
            >
              {client.logoUrl ? (
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="max-h-20 max-w-[250px] object-contain drop-shadow-xl md:max-h-32 md:max-w-[350px]"
                />
              ) : (
                <span className="text-5xl font-black tracking-tighter text-white drop-shadow-lg md:text-8xl">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
