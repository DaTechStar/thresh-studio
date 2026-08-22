"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCursor } from "@/components/cursor/CursorContext";
import { Footer } from "@/components/sections/Footer";
import { getAdjacentProject, type Project } from "@/lib/projects";

export function CaseStudyClient({ project }: { project: Project }) {
  const nextProject = getAdjacentProject(project.slug);
  const { setCursorState } = useCursor();

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current || !headerRef.current || !cardRef.current) return;

    // ── 1. Entrance ───────────────────────────────────────────────────
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .fromTo(".cs-back",  { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.15)
      .fromTo(".cs-cat",   { y: 20,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, 0.25)
      .fromTo(".cs-title", { y: 64,  opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, 0.35)
      .fromTo(".cs-sub",   { y: 24,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.55)
      .fromTo(cardRef.current, { scale: 1.07, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 }, 0.1);

    // ── 2. Compute initial card bounds from rendered header ───────────
    //    We read the rects AFTER the entrance animation's first tick so
    //    the layout is stable.
    const heroRect   = heroRef.current.getBoundingClientRect();
    const headerRect = headerRef.current.getBoundingClientRect();

    const PAD = window.innerWidth >= 768 ? 64 : 24; // md:px-16 / px-6
    const GAP = 20;

    const initTop    = headerRect.height + GAP;
    const initLeft   = PAD;
    const initRight  = PAD;
    const initBottom = 0;

    // Position the card absolutely with the computed offsets
    gsap.set(cardRef.current, {
      position:     "absolute",
      top:          initTop,
      left:         initLeft,
      right:        initRight,
      bottom:       initBottom,
      borderRadius: "1.25rem",
      overflow:     "hidden",
      width:        "auto",
      height:       "auto",
    });

    // ── 3. Scroll-driven expansion ────────────────────────────────────
    //    pin:true is used instead of CSS sticky — avoids overflow
    //    ancestor restrictions entirely.
    //    As the user scrolls 1000px, the card expands from its
    //    initial inset to inset:0 (true fullscreen within the viewport).
    const expandTl = gsap.timeline({
      scrollTrigger: {
        trigger:      heroRef.current,
        start:        "top top",
        end:          "+=1000",
        pin:          true,
        scrub:        1.5,
        anticipatePin: 1,
        pinSpacing:   true,
      },
    });

    expandTl
      // Fade/slide the text header away
      .to(headerRef.current, { opacity: 0, y: -32, duration: 0.4 }, 0)
      // Expand card to fullscreen
      .to(cardRef.current, {
        top:          0,
        left:         0,
        right:        0,
        bottom:       0,
        borderRadius: 0,
        duration:     1,
        ease:         "none",
      }, 0);

    // ── 4. Scroll reveals for sections below ─────────────────────────
    gsap.utils.toArray<HTMLElement>(".cs-reveal", containerRef.current).forEach((el) => {
      gsap.fromTo(el, { y: 48, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
      });
    });

    gsap.fromTo(".cs-stat", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
      scrollTrigger: { trigger: ".cs-stats-row", start: "top 88%" },
    });

    gsap.utils.toArray<HTMLElement>(".cs-gal", containerRef.current).forEach((el, i) => {
      gsap.fromTo(el, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: (i % 2) * 0.12,
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-background text-foreground">

      {/* ── HERO ─────────────────────────────────────────────────────────
          z-[2]  → above the sticky footer (z-0)
          overflow-hidden → clips the card as it expands
          GSAP pin:true handles pinning so no overflow restriction issues */}
      <section
        ref={heroRef}
        className="relative z-[2] h-screen bg-background overflow-hidden"
      >
        {/* Text header — fades out on scroll */}
        <div ref={headerRef} className="relative z-10 pt-36 md:pt-40 px-6 md:px-16 pb-5">
          <Link
            href="/work"
            className="cs-back inline-flex items-center gap-2 mb-8 text-neutral-500 hover:text-brand-100 transition-colors font-mono text-xs uppercase tracking-widest cursor-none group"
            onMouseEnter={() => setCursorState("link")}
            onMouseLeave={() => setCursorState("default")}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full border border-neutral-700 group-hover:border-brand-500 transition-colors">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-px transition-transform" />
            </span>
            All Work
          </Link>

          <div className="flex items-center gap-5 mb-5">
            <span className="cs-cat font-mono text-xs uppercase tracking-[0.35em] text-brand-300">{project.category}</span>
            <span className="cs-cat w-6 h-px bg-neutral-700" />
            <span className="cs-cat font-mono text-xs uppercase tracking-[0.35em] text-neutral-500">{project.year}</span>
          </div>

          <h1 className="cs-title text-[11vw] md:text-[7vw] font-bold tracking-[-0.04em] uppercase leading-[0.85] text-brand-100 mb-3">
            {project.title}
          </h1>

          <p className="cs-sub text-sm md:text-base text-neutral-400 font-light max-w-xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Card — positioned + expanded by GSAP. Initial position is set
            dynamically in useGSAP based on headerRef.height. */}
        <div
          ref={cardRef}
          className="cursor-none"
          onMouseEnter={() => setCursorState("drag")}
          onMouseLeave={() => setCursorState("default")}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── CONTENT CARD ─────────────────────────────────────────────────
          z-[1]  → above footer (z-0), below hero during pin (z-[2])
          rounded-b + shadow creates the "page reveals footer" effect */}
      <div className="relative z-[1] bg-background shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-b-3xl md:rounded-b-[60px] overflow-clip">

        {/* STATS */}
        <div className="cs-stats-row border-b border-neutral-800/60">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800/60">
            {project.stats.map((stat) => (
              <div key={stat.label} className="cs-stat px-8 md:px-16 py-10 flex flex-col gap-2">
                <span className="text-5xl md:text-6xl font-bold tracking-tighter" style={{ color: project.accentColor }}>
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        <section className="px-6 md:px-16 py-20 md:py-28 border-b border-neutral-800/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="cs-reveal">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-400 mb-6">Overview</p>
              <p className="text-xl md:text-2xl text-neutral-200 font-light leading-relaxed">{project.description}</p>
            </div>
            <div className="flex flex-col gap-10">
              <div className="cs-reveal">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">Services</p>
                <ul className="flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <li key={s} className="px-4 py-2 rounded-full border border-neutral-700 text-sm font-mono text-neutral-300 uppercase tracking-wide">{s}</li>
                  ))}
                </ul>
              </div>
              <div className="cs-reveal">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">Deliverables</p>
                <ul className="flex flex-wrap gap-2">
                  {project.deliverables.map((d) => (
                    <li key={d} className="px-4 py-2 rounded-full border border-brand-700/50 bg-brand-700/15 text-sm font-mono text-brand-200 uppercase tracking-wide">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CHALLENGE / APPROACH */}
        <section className="border-b border-neutral-800/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800/60">
            <div className="cs-reveal px-6 md:px-16 py-16 md:py-24">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">The Challenge</p>
              <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">{project.challenge}</p>
            </div>
            <div className="cs-reveal px-6 md:px-16 py-16 md:py-24">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">Our Approach</p>
              <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed">{project.approach}</p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="px-6 md:px-16 py-20 md:py-28 border-b border-neutral-800/60">
          <p className="cs-reveal font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-10">Process & Stills</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {project.gallery.map((src, i) => (
              <div key={i} className={`cs-gal relative overflow-hidden rounded-2xl bg-neutral-900 ${i === 0 ? "md:col-span-2 aspect-[16/7]" : "aspect-[4/3]"}`}>
                <img src={src} alt={`${project.title} — ${i + 1}`} className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal hover:scale-[1.04] transition-all duration-700" />
              </div>
            ))}
          </div>
        </section>

        {/* OUTCOME */}
        <section className="px-6 md:px-16 py-20 md:py-28 border-b border-neutral-800/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="cs-reveal">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">The Outcome</p>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] uppercase" style={{ color: project.accentColor }}>
                The<br />Result.
              </h2>
            </div>
            <p className="cs-reveal text-xl md:text-2xl text-neutral-200 font-light leading-relaxed">{project.outcome}</p>
          </div>
        </section>

        {/* NEXT PROJECT */}
        {nextProject && (
          <section className="cs-reveal">
            <Link href={`/work/${nextProject.slug}`} className="group block cursor-none"
              onMouseEnter={() => setCursorState("project")}
              onMouseLeave={() => setCursorState("default")}
            >
              <div className="relative w-full aspect-[16/7] overflow-hidden bg-neutral-900">
                <img src={nextProject.image} alt={nextProject.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">Next Project</p>
                  <div className="flex items-end justify-between gap-6">
                    <h2 className="text-[10vw] md:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] text-brand-100 group-hover:text-white transition-colors duration-500">
                      {nextProject.title}
                    </h2>
                    <div className="flex-shrink-0 flex items-center gap-3 mb-2 font-mono text-sm uppercase tracking-widest text-neutral-400 group-hover:text-brand-100 transition-colors">
                      <span className="hidden md:block">View Case Study</span>
                      <div className="p-3 rounded-full border border-neutral-700 group-hover:border-brand-500 group-hover:bg-brand-500/10 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 font-mono text-sm text-neutral-500 uppercase tracking-widest">{nextProject.category} — {nextProject.year}</p>
                </div>
              </div>
            </Link>
          </section>
        )}

      </div>{/* end content card */}

      <Footer />
    </div>
  );
}
