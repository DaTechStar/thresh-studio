"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useCursor } from "../cursor/CursorContext";
import { cn } from "@/lib/utils";

const services = [
  { 
    id: "01", 
    name: "Product Branding", 
    desc: "We craft cohesive visual languages and identities that position your product as a premium leader in its market.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2560&auto=format&fit=crop"
  },
  { 
    id: "02", 
    name: "Marketing Video", 
    desc: "Cinematic, high-fidelity campaigns and showreels designed to captivate audiences and drive conversions.",
    image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2560&auto=format&fit=crop"
  },
  { 
    id: "03", 
    name: "3D Motion", 
    desc: "Hyper-realistic product modeling, abstract simulations, and physics-based animations for product reveals.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2560&auto=format&fit=crop"
  },
  { 
    id: "04", 
    name: "Visual Effects", 
    desc: "High-end post-production, color grading, and VFX that elevate your product marketing videos to a cinematic standard.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2560&auto=format&fit=crop"
  }
];

export function Services() {
  const [activeService, setActiveService] = useState<string>("01");
  const { setCursorState } = useCursor();
  
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress within the 400vh tall container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map the 0-1 progress to an index between 0 and 3
    const index = Math.min(
      services.length - 1,
      Math.floor(latest * services.length)
    );
    setActiveService(services[index].id);
  });

  return (
    <section id="capabilities" ref={sectionRef} className="relative h-[400vh] w-full bg-background border-t border-neutral-800">
      
      {/* Sticky container that stays on screen while scrolling through the section */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center py-20 px-4 md:px-16 overflow-hidden">
        
        {/* Cinematic Background Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_50%,var(--color-brand-700)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 h-full items-center">
          
          {/* Left Side: Header */}
          <div className="md:w-1/3 flex flex-col h-fit">
            <h2 className="text-[12vw] md:text-[6vw] font-bold uppercase tracking-[-0.04em] text-neutral-100 leading-[0.85]">
              Our <br/>Capabilities
            </h2>
            <p className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-brand-300 uppercase mt-8 md:mt-12 border-l-2 border-brand-500/50 pl-4 py-2 opacity-80">
              The tools we use to craft <br/>premium product marketing videos.
            </p>
          </div>

          {/* Right Side: Expanding Interactive Accordion */}
          <div className="md:w-2/3 flex flex-col w-full mt-8 md:mt-0">
            {services.map((service) => {
              const isActive = activeService === service.id;

              return (
                <div 
                  key={service.id}
                  className={cn(
                    "group flex flex-col border-b border-neutral-900 overflow-hidden cursor-none transition-colors duration-700 relative",
                    isActive ? "bg-transparent" : ""
                  )}
                  onMouseEnter={() => setCursorState("explore")}
                  onMouseLeave={() => setCursorState("default")}
                >
                  {/* Subtle cyan hover glow for the row */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Header (Always Visible) */}
                  <div className="relative z-10 flex items-center gap-6 md:gap-8 py-5 md:py-8 px-2 md:px-6">
                    <span className={cn(
                      "text-[10px] md:text-xs font-mono transition-colors duration-500",
                      isActive ? "text-brand-300 drop-shadow-[0_0_10px_rgba(0,211,218,0.5)]" : "text-neutral-700 group-hover:text-brand-500"
                    )}>
                      {service.id}
                    </span>
                    <h3 className={cn(
                      "text-2xl md:text-4xl font-bold tracking-tighter uppercase transition-colors duration-500",
                      isActive ? "text-neutral-100" : "text-neutral-600 group-hover:text-neutral-300"
                    )}>
                      {service.name}
                    </h3>
                  </div>

                  {/* Expanding Content Container */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="px-2 md:px-6 overflow-hidden"
                      >
                        <div className="pb-6 flex flex-col md:flex-row gap-6 items-start">
                          {/* Image Reveal */}
                          <div className="w-full md:w-1/2 h-[20vh] md:h-[25vh] relative rounded-xl overflow-hidden shadow-2xl">
                            <img 
                              src={service.image} 
                              alt={service.name}
                              className="absolute inset-0 w-full h-full object-cover md:mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 scale-105"
                            />
                            <div className="absolute inset-0 bg-brand-700/20 mix-blend-overlay pointer-events-none" />
                          </div>
                          
                          {/* Description Reveal */}
                          <div className="w-full md:w-1/2 flex flex-col justify-end h-full">
                             <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                               {service.desc}
                             </p>
                             <button className="mt-4 md:mt-6 text-[10px] font-mono tracking-[0.2em] text-brand-200 border border-brand-500/30 w-fit px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-brand-500/10 transition-colors uppercase">
                               Explore {service.name}
                             </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
