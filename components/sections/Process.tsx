"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const processSteps = [
  { 
    id: "01", 
    title: "Discovery", 
    desc: "Uncovering the core of your product and its market positioning.",
    tags: ["Research", "Workshops"]
  },
  { 
    id: "02", 
    title: "Strategy", 
    desc: "Defining the narrative for your product branding and marketing videos.",
    tags: ["Positioning", "Scripting"]
  },
  { 
    id: "03", 
    title: "Production", 
    desc: "Crafting the visual language, 3D assets, and cinematic video content.",
    tags: ["3D/WebGL", "Video Shoot"]
  },
  { 
    id: "04", 
    title: "Launch", 
    desc: "Releasing high-fidelity product marketing videos that captivate and convert.",
    tags: ["Campaign Launch", "Delivery"]
  },
];

export function Process() {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !progressRef.current) return;

    const nodes = gsap.utils.toArray<HTMLElement>(".process-node");

    // Animate the line drawing down
    gsap.to(progressRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Animate each node as the line reaches it
    nodes.forEach((node, i) => {
      const dot = node.querySelector(".process-dot");
      const content = node.querySelector(".process-content");

      gsap.to(dot, {
        backgroundColor: "#00D3DA",
        scale: 1.2,
        boxShadow: "0 0 20px #00D3DA",
        scrollTrigger: {
          trigger: node,
          start: "center center+=100",
          end: "center center-=100",
          scrub: true,
        },
      });

      gsap.from(content, {
        opacity: 0.2,
        x: -20,
        scrollTrigger: {
          trigger: node,
          start: "top center+=100",
          end: "center center",
          scrub: true,
        },
      });
    });

  }, { scope: container });

  return (
    <section id="process" ref={container} className="relative w-full bg-background py-32 px-4 md:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-[12vw] md:text-[6vw] font-bold tracking-[-0.04em] uppercase mb-24 md:mb-40 text-neutral-100 leading-[0.85]">
          The Process
        </h2>

        {/* The Track */}
        <div 
          ref={lineRef}
          className="absolute left-[23px] md:left-[39px] top-40 md:top-56 bottom-0 w-[2px] bg-neutral-800 rounded-full"
        >
          {/* The Fill */}
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 w-full h-0 bg-brand-300 rounded-full shadow-[0_0_20px_rgba(0,169,174,0.8)]"
          />
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {processSteps.map((step) => (
            <div key={step.id} className="process-node flex items-start gap-8 md:gap-16 relative z-10">
              
              {/* Dot */}
              <div className="relative mt-2 shrink-0 flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-background border border-border rounded-full">
                <div className="process-dot w-3 h-3 md:w-4 md:h-4 rounded-full bg-neutral-500 transition-colors" />
              </div>

              {/* Content */}
              <div className="process-content flex-1 pt-1 md:pt-4">
                <span className="text-brand-300 font-mono text-sm mb-4 block">
                  Phase {step.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed mb-6">
                  {step.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs uppercase tracking-widest border border-border rounded-full text-neutral-400 bg-neutral-600/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
