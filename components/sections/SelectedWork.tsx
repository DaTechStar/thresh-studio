"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCursor } from "../cursor/CursorContext";
import { cn } from "@/lib/utils";

const projects = [
  { 
    id: 1, 
    title: "Lumina Edge", 
    category: "Product Video", 
    year: "2026",
    // Highly reliable Unsplash images (premium product aesthetic)
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2560&auto=format&fit=crop" // Mac/tech
  },
  { 
    id: 2, 
    title: "Aether OS", 
    category: "Cinematic Campaign", 
    year: "2025",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop" // Retro tech / UI
  },
  { 
    id: 3, 
    title: "Chronos Watch", 
    category: "3D Product Motion", 
    year: "2025",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2560&auto=format&fit=crop" // Watch product
  },
  { 
    id: 4, 
    title: "Nexus Drive", 
    category: "Brand Showreel", 
    year: "2026",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2560&auto=format&fit=crop" // Headphones/hardware
  },
];

export function SelectedWork() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();

  useGSAP(() => {
    if (!container.current || !scrollWrapper.current) return;

    const sections = gsap.utils.toArray<HTMLElement>(".project-card");
    
    // Calculate exact width to scroll horizontally
    const getScrollAmount = () => {
      return -(scrollWrapper.current!.scrollWidth - window.innerWidth);
    };

    // Smooth horizontal scroll hijack without snap (snap causes sticking/jank)
    gsap.to(scrollWrapper.current, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1, // Smooth scrub
        end: () => `+=${scrollWrapper.current!.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true, // Recalculates on window resize
      },
    });

    // Internal Image Parallax
    sections.forEach((section) => {
      const img = section.querySelector(".project-image");
      if(img) {
        gsap.fromTo(img, 
          { x: "-10vw" }, 
          {
            x: "10vw", 
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: () => `+=${scrollWrapper.current!.scrollWidth}`,
              scrub: true,
            }
          }
        );
      }
    });

  }, { scope: container });

  return (
    <section id="work" ref={container} className="h-screen w-full bg-background overflow-hidden relative">
      {/* Absolute Title that stays pinned on the left */}
      <div className="absolute top-8 md:top-16 left-8 md:left-16 z-20 pointer-events-none">
        <h2 className="text-[10vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-[0.8] text-brand-100 mix-blend-difference">
          Selected<br/>Work
        </h2>
      </div>

      <div 
        ref={scrollWrapper} 
        className="absolute top-0 left-0 h-full flex items-center will-change-transform"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card h-full w-screen flex items-center justify-center relative shrink-0 overflow-hidden"
          >
            <div 
              className="relative w-full h-full group cursor-none"
              onMouseEnter={() => setCursorState("project")}
              onMouseLeave={() => setCursorState("default")}
            >
              {/* Parallax Image Container */}
              <div className="absolute top-0 left-[-20%] w-[140%] h-full pointer-events-none">
                <img
                  className="project-image w-full h-full object-cover mix-blend-luminosity transition-transform duration-[2s] ease-out group-hover:scale-[1.1] group-hover:mix-blend-normal"
                  src={project.image}
                  alt={project.title}
                />
              </div>

              {/* Overlays for contrast (always visible) */}
              <div className="absolute inset-0 bg-neutral-900/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent opacity-90" />
              
              {/* Center Typography overlay using mix-blend-difference (always visible) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-8 pointer-events-none">
                <div className="overflow-hidden mix-blend-difference">
                  <h3 className="text-[12vw] md:text-[8vw] font-bold tracking-[-0.04em] uppercase leading-[0.8] text-neutral-100 text-center">
                    {project.title}
                  </h3>
                </div>
                
                <div className="overflow-hidden mt-8 mix-blend-difference">
                  <div className="flex gap-8 items-center justify-center">
                    <span className="text-sm md:text-base font-mono uppercase tracking-[0.4em] text-brand-200">{project.category}</span>
                    <span className="w-12 h-[1px] bg-brand-500/50" />
                    <span className="text-sm md:text-base font-mono text-neutral-300">{project.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
