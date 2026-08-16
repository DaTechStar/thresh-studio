"use client";

import { Preloader } from "@/components/sections/Preloader";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { useEffect } from "react";

import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  // Ensure the page starts at the top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Preloader />
      
      {/* 
        This z-10 wrapper holds the main scrollable content. 
        It sits on top of the Footer so the footer is revealed as we scroll past this container.
      */}
      <div className="relative z-10 bg-background mb-0 md:mb-0 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-b-3xl md:rounded-b-[60px] overflow-clip">
        <Hero />
        <TrustedBy />
        <SelectedWork />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
