"use client";

import React, { useState } from "react";
import { useCursor } from "../cursor/CursorContext";
import { cn } from "@/lib/utils";

export function Contact() {
  const { setCursorState } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Background glow that expands on hover */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-1000 ease-out",
          isHovered && "opacity-100"
        )} 
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-brand-500/20 blur-[150px]" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-brand-300/10 blur-[100px]" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-4">
        <h2 className="text-4xl md:text-7xl lg:text-[9vw] font-bold tracking-tighter uppercase leading-[0.85] text-neutral-100 mb-16 mix-blend-plus-lighter">
          Ready to <br/>
          Make <span className="text-brand-300 italic pr-4">Product</span><br/>
          Magic?
        </h2>

        <a 
          href="mailto:hello@thresh.studio"
          className="group relative cursor-none"
          onMouseEnter={() => {
            setIsHovered(true);
            setCursorState("project"); // A large custom cursor for the CTA
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setCursorState("default");
          }}
        >
          <span className="text-xl md:text-2xl font-medium tracking-[0.2em] uppercase text-brand-200 transition-all duration-500 group-hover:tracking-[0.4em] drop-shadow-[0_0_15px_rgba(125,249,255,0.3)]">
            Book a Strategy Call ↗
          </span>
          <div className="absolute -bottom-6 left-0 w-full h-[1px] bg-brand-400 scale-x-0 origin-left transition-transform duration-700 group-hover:scale-x-100 shadow-[0_0_10px_var(--color-brand-400)]" />
        </a>
      </div>
    </section>
  );
}
