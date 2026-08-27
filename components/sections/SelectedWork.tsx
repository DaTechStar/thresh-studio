"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { useCursor } from "../cursor/CursorContext";
import { projects } from "@/lib/projects";
import { VimeoEmbed } from "@/components/media/VimeoEmbed";

// Only show the first 4 on the homepage section
const featuredProjects = projects.slice(0, 4);

export function SelectedWork() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLAnchorElement>(null);
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

    // Badge entry animation
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        { scale: 0, opacity: 0, rotation: -90 },
        {
          scale: 1, opacity: 1, rotation: 0,
          ease: "back.out(1.5)",
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%", // animate in before it pins
            toggleActions: "play reverse play reverse",
          }
        }
      );
    }

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
        style={{ width: `${featuredProjects.length * 100}vw` }}
      >
        {featuredProjects.map((project) => (
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
                {project.vimeoId ? (
                  <VimeoEmbed 
                    vimeoId={project.vimeoId} 
                    className="project-image w-full h-full object-cover md:mix-blend-luminosity transition-transform duration-[2s] ease-out group-hover:scale-[1.1] md:group-hover:mix-blend-normal" 
                  />
                ) : (
                  <img
                    className="project-image w-full h-full object-cover md:mix-blend-luminosity transition-transform duration-[2s] ease-out group-hover:scale-[1.1] md:group-hover:mix-blend-normal"
                    src={project.image}
                    alt={project.title}
                  />
                )}
              </div>

              {/* Overlays for contrast (always visible) */}
              <div className="absolute inset-0 bg-neutral-900/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent opacity-90" />

              {/* ── Per-card Case Study CTA ─────────────────────────────── */}
              <Link
                href={`/work/${project.slug}`}
                className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-30 pointer-events-auto"
                onMouseEnter={() => setCursorState("link")}
                onMouseLeave={() => setCursorState("default")}
              >
                <div className="flex items-center gap-3 group/btn">
                  {/* Pill button */}
                  <div className="relative overflow-hidden flex items-center gap-3 pl-5 pr-4 py-3 rounded-full border border-brand-500/40 bg-background/30 backdrop-blur-md transition-all duration-500 group-hover/btn:border-brand-400 group-hover/btn:bg-brand-500/15 group-hover/btn:pr-5">
                    {/* Animated fill */}
                    <div className="absolute inset-0 bg-brand-500/10 translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out rounded-full" />
                    <span className="relative font-mono text-xs uppercase tracking-[0.25em] text-brand-100 transition-colors duration-300 whitespace-nowrap">
                      Case Study
                    </span>
                    {/* Arrow icon */}
                    <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-brand-500/20 group-hover/btn:bg-brand-400/30 transition-colors duration-300">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="text-brand-100 group-hover/btn:translate-x-px transition-transform duration-300"
                      >
                        <path
                          d="M1 9L9 1M9 1H3M9 1V7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Circular Badge — links to full archive */}
      <Link 
        href="/work" 
        ref={badgeRef}
        className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-30 group cursor-none" 
        onMouseEnter={() => setCursorState("link")}
        onMouseLeave={() => setCursorState("default")}
      >
        <div className="relative w-28 h-28 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-brand-500/10 backdrop-blur-md border border-brand-500/20 hover:bg-brand-500/20 transition-colors duration-500 overflow-hidden">
          {/* Rotating Text SVG */}
          <div className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full text-brand-100">
              <path id="circlePath" d="M 50, 50 m -34, 0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" fill="transparent" />
              <text className="text-[12px] font-mono uppercase tracking-[0.2em] fill-current">
                <textPath href="#circlePath" startOffset="0%">
                  VIEW ALL WORKS • VIEW ALL WORKS • 
                </textPath>
              </text>
            </svg>
          </div>
          {/* Center Arrow */}
          <div className="absolute text-brand-100 group-hover:scale-125 transition-transform duration-500 ease-out">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </Link>
    </section>
  );
}
