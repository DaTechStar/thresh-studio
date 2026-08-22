"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCursor } from "@/components/cursor/CursorContext";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  const container = useRef<HTMLDivElement>(null);
  const { setCursorState } = useCursor();

  useGSAP(() => {
    if (!container.current) return;

    window.scrollTo(0, 0);

    const tl = gsap.timeline();

    // Intro Animations for sticky left panel
    tl.fromTo(".sticky-elem", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
    );

    // Initial load animation for right panel projects
    tl.fromTo(".project-card", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
      "-=1"
    );

    // Extreme Image Parallax & Scrub Scale Effect
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");
    cards.forEach((card) => {
      const inner = card.querySelector(".project-card-inner");
      const img = card.querySelector(".project-img");
      const cardTitleWrapper = card.querySelector(".project-title-wrapper");
      
      if (inner) {
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top -35%",
            scrub: true,
          }
        });

        // ENTER (first half): narrow → full width
        scrubTl.fromTo(inner,
          { scaleX: 0.75, scaleY: 0.95, opacity: 0.5, y: 40 },
          { scaleX: 1, scaleY: 1, opacity: 1, y: 0, duration: 0.5, ease: "none" }
        )
        // EXIT (second half): full width → narrow, perfectly mirrored
        .to(inner,
          { scaleX: 0.75, scaleY: 0.95, opacity: 0.5, y: -40, duration: 0.5, ease: "none" }
        );
      }
      
      if(img) {
        gsap.to(img, {
          y: "30%", // aggressive parallax
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
      
      if (cardTitleWrapper) {
        // Subtle counter-parallax for the title
        gsap.to(cardTitleWrapper, {
          y: "-15%",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });

  }, { scope: container });

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative z-10 bg-background shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-b-3xl md:rounded-b-[60px] overflow-clip">
        <main ref={container} className="relative min-h-screen w-full flex flex-col lg:flex-row">
          
          {/* LEFT: Sticky Sidebar */}
          <div className="lg:w-1/3 w-full lg:h-screen lg:sticky lg:top-0 p-8 md:p-16 pt-28 lg:pt-40 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-800/50 z-20 bg-background/50 backdrop-blur-md">
            
            <div className="sticky-elem flex flex-col items-start">
              <Link 
                href="/" 
                className="flex items-center gap-2 mb-16 text-neutral-400 hover:text-brand-100 transition-colors uppercase font-mono text-sm tracking-wider cursor-none group"
                onMouseEnter={() => setCursorState("link")}
                onMouseLeave={() => setCursorState("default")}
              >
                <div className="p-2 rounded-full border border-neutral-800 group-hover:border-brand-500 transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
                Back to Home
              </Link>
              
              <div className="overflow-hidden mb-6">
                <h1 className="text-[15vw] lg:text-[6vw] font-bold tracking-tighter uppercase leading-[0.85] text-brand-100 mix-blend-difference">
                  Selected<br/>Archive
                </h1>
              </div>
              
              <div className="overflow-hidden">
                <p className="text-lg md:text-xl text-neutral-400 max-w-sm font-light leading-relaxed">
                  A curated collection of our most iconic digital experiences, product motion, and cinematic campaigns.
                </p>
              </div>
            </div>

            <div className="sticky-elem hidden lg:flex flex-col gap-6 font-mono text-sm text-neutral-500 uppercase tracking-widest">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span>Available for new projects</span>
              </div>
              <p>2024 — 2026</p>
            </div>
          </div>

          {/* RIGHT: Scrollable Project List */}
          <div className="lg:w-2/3 w-full p-4 md:p-8 lg:p-16 pt-12 lg:pt-40 flex flex-col gap-16 md:gap-32 pb-32">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card relative w-full"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="block cursor-none"
                  onMouseEnter={() => setCursorState("project")}
                  onMouseLeave={() => setCursorState("default")}
                >
                  <div className="project-card-inner relative w-full group flex flex-col will-change-transform">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-3xl bg-neutral-900">
                      <div className="absolute inset-[-20%] w-[140%] h-[140%] pointer-events-none">
                        <img
                          className="project-img w-full h-full object-cover mix-blend-luminosity transition-all duration-[2s] ease-out group-hover:scale-[1.05] group-hover:mix-blend-normal"
                          src={project.image}
                          alt={project.title}
                        />
                      </div>
                      
                      {/* Subtle Grain / Darkening overlay */}
                      <div className="absolute inset-0 bg-neutral-900/30 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-10" />
                      
                      {/* Massive Title Overlay */}
                      <div className="project-title-wrapper absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-10">
                        <h2 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.8] text-brand-100 mix-blend-difference opacity-90 group-hover:opacity-100 transition-opacity duration-500 text-center">
                          {project.title}
                        </h2>
                      </div>

                      {/* View Case Study hover pill — top right of image */}
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out">
                        <div className="flex items-center gap-2 pl-4 pr-3 py-2 rounded-full bg-background/60 backdrop-blur-md border border-brand-500/40">
                          <span className="font-mono text-xs uppercase tracking-widest text-brand-100">View Case Study</span>
                          <div className="w-5 h-5 rounded-full bg-brand-500/30 flex items-center justify-center">
                            <ArrowUpRight className="w-3 h-3 text-brand-100" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="mt-6 md:mt-8 flex items-center justify-between px-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 font-mono text-sm md:text-base uppercase tracking-widest">
                        <span className="text-brand-300">{project.category}</span>
                        <span className="hidden md:block w-1 h-1 rounded-full bg-neutral-700" />
                        <span className="text-neutral-500">{project.year}</span>
                      </div>
                      
                      <div className="text-neutral-500 font-mono text-sm border-b border-transparent group-hover:border-brand-500 group-hover:text-brand-200 transition-all duration-300">
                        Explore Project &rarr;
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
