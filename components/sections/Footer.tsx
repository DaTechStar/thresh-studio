"use client";

import React, { useRef } from "react";
import { useCursor } from "../cursor/CursorContext";
import { gsap, useGSAP } from "@/lib/gsap";
import { motion } from "motion/react";

export function Footer() {
  const { setCursorState } = useCursor();
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    // Simple parallax effect for the massive text at the bottom
    gsap.fromTo(".footer-logo",
      { y: -150, opacity: 0.5 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        }
      }
    );
  }, { scope: container });

  return (
    <footer ref={container} className="sticky bottom-0 left-0 w-full min-h-screen bg-background flex flex-col justify-between pt-32 pb-8 px-4 md:px-16 z-0 overflow-hidden text-neutral-100">
      
      {/* Dynamic Aurora / Mesh Gradient Background (Living & Moving) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-100">
        <div className="absolute inset-0 bg-background" /> {/* Base background */}
        
        {/* Creative Pattern Overlay (Subtle Grid) */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(var(--color-brand-300) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Bright Cyan Orb */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "-10%", "5%", "0%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-200/20 blur-[120px] mix-blend-screen"
        />
        
        {/* Mid Teal Orb */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: ["0%", "-10%", "15%", "0%"],
            y: ["0%", "10%", "-5%", "0%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-brand-400/30 blur-[140px] mix-blend-screen"
        />
        
        {/* Very Dark Cyan Orb for contrast depth */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1.4, 1],
            x: ["0%", "10%", "-15%", "0%"],
            y: ["0%", "-5%", "15%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-brand-600/60 blur-[150px] mix-blend-screen"
        />
        
        {/* Brightest Brand Accent for intersection glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            x: ["0%", "-20%", "5%", "0%"],
            y: ["0%", "20%", "-10%", "0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-100/10 blur-[130px] mix-blend-screen"
        />
      </div>

      {/* Top Section - Clean vertical stack */}
      <div className="relative z-10 w-full flex flex-col max-w-screen-2xl mx-auto h-full flex-1">
        
        {/* Navigation and Socials (Top right aligned on desktop, left on mobile) */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start mb-24 md:mb-32">
          
          <div className="mb-16 md:mb-0">
             <p className="text-sm md:text-base font-mono tracking-[0.3em] uppercase text-brand-300">
                Start a Project
             </p>
          </div>

          <div className="flex flex-row gap-16 md:gap-32 font-mono text-sm tracking-[0.2em] uppercase">
            <div className="flex flex-col gap-6">
              <span className="text-neutral-400 mb-2">Menu</span>
              <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>Work</a>
              <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>Process</a>
              <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>Services</a>
            </div>
            
            <div className="flex flex-col gap-6 text-left">
              <span className="text-neutral-400 mb-2">Contact</span>
              <a href="mailto:hello@thresh.studio" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>Email Us</a>
              <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>Book a Call</a>
            </div>
          </div>
        </div>

        {/* Massive Call to action */}
        <div className="flex flex-col items-start w-full">
          <a 
            href="mailto:hello@thresh.studio"
            className="group relative inline-flex flex-col cursor-none w-full"
            onMouseEnter={() => setCursorState("magnetic")} 
            onMouseLeave={() => setCursorState("default")}
          >
            {/* Responsively scaled to fit perfectly */}
            <span className="text-[6vw] md:text-[5vw] font-bold tracking-tighter uppercase transition-colors group-hover:text-brand-200">
              hello@thresh.studio
            </span>
            <div className="w-full h-[2px] bg-neutral-600 mt-2 relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full w-full bg-brand-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            </div>
          </a>
        </div>
      </div>

      {/* Massive Brand Mark at the bottom */}
      <div className="relative z-10 w-full mt-auto pt-24 flex flex-col items-center justify-end overflow-hidden">
        <img 
          src="/logo.png" 
          alt="Thresh Studio" 
          className="footer-logo w-[80vw] md:w-[60vw] h-auto object-contain mix-blend-plus-lighter opacity-80" 
        />
        
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-neutral-800 text-xs md:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase gap-6">
          <p className="w-full md:w-1/3 text-center md:text-left">© 2026 THRESH STUDIO LLC</p>
          
          <div className="w-full md:w-1/3 flex justify-center gap-6 md:gap-10">
             <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>Instagram</a>
             <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>LinkedIn</a>
             <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>Vimeo</a>
             <a href="#" className="text-neutral-100 hover:text-brand-300 transition-colors cursor-none" onMouseEnter={() => setCursorState("magnetic")} onMouseLeave={() => setCursorState("default")}>X</a>
          </div>

          <p className="w-full md:w-1/3 text-center md:text-right text-brand-300">Product Branding & Cinematic Marketing</p>
        </div>
      </div>

    </footer>
  );
}
