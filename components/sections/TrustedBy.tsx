"use client";

import React, { useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from "motion/react";
import { useCursor } from "../cursor/CursorContext";
import { cn } from "@/lib/utils";

const clients = [
  "GOOGLE", "SAMSUNG", "APPLE", "META", "AMAZON", "NETFLIX", "SPOTIFY",
  "NVIDIA", "TESLA", "UBER", "AIRBNB", "STRIPE"
];

interface MarqueeRowProps {
  items: string[];
  baseVelocity: number;
}

function MarqueeRow({ items, baseVelocity = 100 }: MarqueeRowProps) {
  const baseX = useMotionValue(0);
  const { setCursorState } = useCursor();
  
  // Track hover to slow down
  const [isHovered, setIsHovered] = useState(false);
  const velocityFactor = useMotionValue(1);

  useAnimationFrame((t, delta) => {
    // Smoothly transition velocity factor based on hover
    const targetFactor = isHovered ? 0.2 : 1;
    velocityFactor.set(velocityFactor.get() + (targetFactor - velocityFactor.get()) * 0.1);

    let moveBy = baseVelocity * (delta / 1000) * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  return (
    <div 
      className="flex whitespace-nowrap overflow-hidden py-4"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorState("drag");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorState("default");
      }}
    >
      <motion.div className="flex gap-16 md:gap-32 px-8" style={{ x }}>
        {items.concat(items).concat(items).concat(items).map((client, i) => (
          <span 
            key={i} 
            className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "1px var(--muted-foreground)" }}
          >
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function TrustedBy() {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="mb-16 px-4 md:px-8">
        <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-600 font-mono">
          Trusted By
        </h2>
      </div>
      <div className="flex flex-col gap-8 md:gap-16">
        <MarqueeRow items={clients.slice(0, 6)} baseVelocity={-2} />
        <MarqueeRow items={clients.slice(6, 12)} baseVelocity={2.5} />
      </div>
    </section>
  );
}
