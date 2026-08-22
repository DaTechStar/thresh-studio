"use client";

import React, { useState, useEffect } from "react";
import { useCursor } from "../cursor/CursorContext";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setCursorState } = useCursor();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      lenis?.scrollTo(href);
    }
  };

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "Process", href: "#process" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header 
      className="absolute top-0 left-0 w-full z-[100] flex justify-center px-4 md:px-8 py-8"
    >
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-10 py-3 md:py-4 flex items-center justify-between bg-background/20 backdrop-blur-md border border-brand-500/20 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)] gap-4">
        
        {/* Logo (Original Color, no mix-blend/invert) */}
        <a 
          href="/" 
          className="relative z-10 flex items-center justify-center cursor-none group"
          onMouseEnter={() => setCursorState("magnetic")}
          onMouseLeave={() => setCursorState("default")}
        >
          <img 
            src="/logo.png" 
            alt="Thresh Studio" 
            className="h-6 md:h-8 w-auto transition-transform duration-700 group-hover:scale-105" 
          />
        </a>

        {/* Center Links (Sleek, bright white, premium spacing) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-100 hover:text-brand-200 transition-colors duration-500 cursor-none relative group"
              onMouseEnter={() => setCursorState("magnetic")}
              onMouseLeave={() => setCursorState("default")}
            >
              {link.name}
              {/* Subtle underline that grows from center */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-200 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        {/* Right CTA (Sharp, minimalistic button) */}
        <div className="flex items-center shrink-0">
          <a
            href="mailto:hello@thresh.studio"
            className="group relative flex items-center justify-center px-5 py-3 md:px-8 md:py-4 rounded-full border border-neutral-700 overflow-hidden cursor-none transition-colors duration-700 hover:border-brand-300"
            onMouseEnter={() => setCursorState("magnetic")}
            onMouseLeave={() => setCursorState("default")}
          >
            <div className="absolute inset-0 bg-brand-500/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.76,0,0.24,1]" />
            <span className="relative z-10 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-neutral-100 group-hover:text-brand-100 transition-colors duration-300 whitespace-nowrap">
              Start Project
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
