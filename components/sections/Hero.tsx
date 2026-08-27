"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCursor } from "../cursor/CursorContext";
import { VimeoEmbed } from "../media/VimeoEmbed";

export function Hero() {
  const { setCursorState } = useCursor();
  const container = useRef<HTMLDivElement>(null);
  const textContainer = useRef<HTMLDivElement>(null);
  const videoWrapper = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    // Split the text into letters for a premium, staggering reveal
    const letters = gsap.utils.toArray(".hero-letter");

    gsap.fromTo(letters,
      { y: 150, opacity: 0, rotateX: -90, filter: "blur(20px)" },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.5,
        stagger: 0.02,
        ease: "power4.out",
        delay: 3.5, // wait for preloader
      }
    );

    gsap.fromTo(".hero-sub",
      { opacity: 0, y: 20, filter: "blur(15px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 4.5, ease: "power3.out" }
    );

    // Scroll Choreography - The "Cinematic" Camera Move
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Typography splits and moves towards the camera
    tl.to(textContainer.current, {
      scale: 1.5,
      opacity: 0,
      filter: "blur(20px)",
      duration: 1,
      ease: "power2.inOut"
    }, 0)
      // Video expands from a framed window into a full immersive background
      .to(videoWrapper.current, {
        width: "100%",
        height: "100vh",
        borderRadius: "0px",
        bottom: "0",
        duration: 1.5,
        ease: "power2.inOut"
      }, 0)
      .to(".hero-overlay", {
        opacity: 0, // reveal the video brightly
        backdropFilter: "blur(0px)",
        duration: 1.5,
      }, 0);

  }, { scope: container });

  const title = "THRESH STUDIO";

  return (
    <section
      ref={container}
      className="relative h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center pt-10"
      style={{ perspective: "1000px" }}
    >
      {/* Cinematic Glowing Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_0%,var(--color-brand-600)_0%,transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 z-0 pointer-events-none w-[50vw] h-[50vw] bg-brand-500/20 blur-[120px] rounded-full mix-blend-screen" />

      <div
        ref={textContainer}
        className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 transform-gpu"
      >
        <h1 className="flex justify-center flex-wrap max-w-full overflow-visible text-[10vw] md:text-[8vw] leading-[0.85] font-bold tracking-[-0.04em] text-neutral-100 uppercase mix-blend-plus-lighter drop-shadow-[0_0_30px_rgba(125,249,255,0.15)] whitespace-nowrap">
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="hero-letter inline-block"
              style={{
                color: char === " " ? "transparent" : (i >= 7 ? "var(--color-brand-200)" : "inherit"),
                transformOrigin: "bottom center"
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <div className="hero-sub mt-6 md:mt-10 flex flex-col items-center gap-8 md:gap-12">
          <p className="text-sm md:text-xl font-medium tracking-[0.3em] text-brand-100 uppercase text-center max-w-2xl leading-relaxed">
            Premium Product Branding & <br className="hidden md:block" /> Cinematic Marketing Videos
          </p>

          <a
            href="#work"
            className="group relative flex items-center justify-center px-10 py-5 rounded-full border border-white/10 overflow-hidden cursor-none transition-colors duration-700 hover:border-white/30 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            onMouseEnter={() => setCursorState("magnetic")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="absolute inset-0 bg-brand-500/40 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.76,0,0.24,1]" />
            <span className="relative z-10 text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-neutral-100 group-hover:text-white transition-colors duration-300">
              Watch Showreel
            </span>
          </a>
        </div>
      </div>

      <div
        ref={videoWrapper}
        className="absolute bottom-[5%] left-0 right-0 mx-auto z-0 h-[40vh] w-[60vw] overflow-hidden rounded-[30px] bg-neutral-600 shadow-[0_0_50px_rgba(0,22,23,0.8)] border border-brand-500/20 transform-gpu"
      >
        <div className="hero-overlay absolute inset-0 z-10 bg-neutral-900/40" style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }} />

        {/* Vimeo Video Background */}
        <VimeoEmbed vimeoId="1121463132" className="absolute inset-0 z-0 opacity-80" />
      </div>
    </section>
  );
}
