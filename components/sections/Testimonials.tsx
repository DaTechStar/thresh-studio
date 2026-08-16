"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useCursor } from "../cursor/CursorContext";

const testimonials = [
  {
    quote: "Thresh didn't just brand our product. They completely changed how our users experience it. An absolute masterclass in digital storytelling. Which nobody out there does among competitors.",
    author: "Sarah Jenkins",
    role: "VP Marketing @ Lumina",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2560&auto=format&fit=crop"
  },
  {
    quote: "The 3D motion work they delivered was nothing short of cinematic. It elevated our campaign from a standard product launch to a visual event.",
    author: "Marcus Chen",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2560&auto=format&fit=crop"
  },
  {
    quote: "Working with this studio felt less like hiring an agency and more like partnering with a high-end film production crew. The attention to detail is insane.",
    author: "Elena Rodriguez",
    role: "Founder @ Chronos",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2560&auto=format&fit=crop"
  },
];

export function Testimonials() {
  const container = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();

  useGSAP(() => {
    if (!container.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
      }
    });

    // Initial setup: stack them all correctly, with background cards hidden
    gsap.set(cards, { 
      transformOrigin: "center center",
    });
    
    cards.forEach((card, i) => {
      if (i > 0) {
        gsap.set(card, { y: -50, scale: 0.95, opacity: 0 }); // Hidden initially, above the stack
      }
    });

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Last card stays
      
      // 1. Current card falls DOWN and fades out
      tl.to(card, {
        y: 100,
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "power1.inOut"
      }, index);

      // 2. Next card smoothly falls DOWN into place
      const nextCard = cards[index + 1];
      tl.to(nextCard, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
      }, index);
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="testimonials"
      className="relative h-screen w-full bg-background flex flex-col overflow-hidden border-t border-neutral-800"
    >
      
      {/* Section Header */}
      <div className="relative z-20 px-4 md:px-16 pt-16 md:pt-24 shrink-0 flex flex-col items-center text-center">
         <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-brand-300 mb-4">
           Client Feedback
         </h2>
         <p className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-neutral-100">
           Don't just take our word for it.
         </p>
      </div>

      {/* Stacked Cards Container */}
      <div 
        className="relative z-10 w-full max-w-5xl mx-auto h-[50vh] md:h-[60vh] mt-16 md:mt-24 perspective-[1000px] cursor-none"
        onMouseEnter={() => setCursorState("explore")}
        onMouseLeave={() => setCursorState("default")}
      >
        {testimonials.map((testimonial, i) => (
          <div 
            key={i} 
            className="testimonial-card absolute top-0 left-0 w-full h-full flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-brand-500/50 bg-black"
            style={{ zIndex: testimonials.length - i }}
          >
            {/* Strong Black to Brand Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black to-brand-500 z-0 opacity-95" />
            
            {/* Bold Top-Left Glow for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_var(--tw-gradient-stops))] from-brand-300/40 via-transparent to-transparent z-0" />
            
            {/* Inner Content */}
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row p-8 md:p-16 gap-8 md:gap-16">
               
               {/* Left Column (Avatar, Name, Rating) */}
               <div className="w-full md:w-1/3 flex flex-col items-start md:border-r border-brand-500/20 md:pr-12">
                  <div className="relative mb-6 md:mb-10 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-2xl">
                    <img src={testimonial.avatar} className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-brand-500/40 mix-blend-color pointer-events-none" />
                  </div>
                  
                  <h4 className="text-xl md:text-2xl font-bold text-neutral-100">{testimonial.author}</h4>
                  <p className="text-[10px] md:text-xs font-mono text-brand-300 uppercase tracking-[0.2em] mt-2 mb-6 md:mb-10 opacity-80">{testimonial.role}</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                     <span className="text-xl font-bold text-neutral-100">5.0</span>
                     <div className="flex gap-1 text-brand-400 text-sm">
                       ★ ★ ★ ★ ★
                     </div>
                  </div>
               </div>

               {/* Right Column (Quote, Buttons) */}
               <div className="w-full md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="text-5xl md:text-7xl text-brand-500/30 font-serif leading-none mb-4 md:mb-6">&ldquo;</div>
                    <p className="text-xl md:text-3xl font-medium tracking-tight text-neutral-200 leading-tight">
                      {testimonial.quote}
                    </p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
