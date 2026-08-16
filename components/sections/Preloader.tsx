"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this might wait for assets to load or 3D models to parse.
    // For now, we simulate a 3 second cinematic preloader.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-brand-700 to-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Deep Premium Radial Gradient Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/15 via-black to-black z-0 pointer-events-none" />

          {/* Premium Logo Reveal */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <div className="relative">
              {/* Intensified Glow effect behind logo */}
              <motion.div 
                className="absolute inset-0 bg-brand-400/30 blur-[60px] rounded-full mix-blend-screen"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <img 
                src="/logo.png" 
                alt="Thresh Studio" 
                className="relative z-10 w-48 md:w-72 h-auto object-contain brightness-125 contrast-125 drop-shadow-[0_0_30px_rgba(0,211,218,0.6)]"
              />
            </div>
            
            {/* Elegant Loading Bar */}
            <div className="absolute -bottom-16 w-32 md:w-48 h-[2px] bg-neutral-800/50 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-gradient-to-r from-brand-500 to-brand-300 shadow-[0_0_10px_var(--color-brand-400)] rounded-full"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
                 style={{ originX: 0 }}
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
