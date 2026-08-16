"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useCursor } from "./CursorContext";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const { cursorState, magneticTarget } = useCursor();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth trailing
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device - disable custom cursor if so
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Handle magnetic attraction
      if (cursorState === "magnetic" && magneticTarget) {
        const { left, top, width, height } = magneticTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Attract toward center (strength based on distance)
        targetX = centerX + distanceX * 0.2;
        targetY = centerY + distanceY * 0.2;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY, cursorState, magneticTarget]);

  if (isTouchDevice) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "#FFFFFF",
      mixBlendMode: "difference" as any,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    },
    project: {
      width: 80,
      height: 80,
      backgroundColor: "#00D3DA",
      mixBlendMode: "normal" as any,
      color: "#000000",
    },
    explore: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(0, 211, 218, 0)",
      border: "1px solid #00D3DA",
      mixBlendMode: "normal" as any,
      color: "#00D3DA",
    },
    drag: {
      width: 60,
      height: 60,
      backgroundColor: "#111111",
      border: "1px solid #333333",
      mixBlendMode: "normal" as any,
    },
    magnetic: {
      width: 40,
      height: 40,
      backgroundColor: "#FFFFFF",
      mixBlendMode: "difference" as any,
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-medium uppercase tracking-widest text-transparent"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={cursorState}
      variants={variants}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {cursorState === "project" && (
          <motion.span
            key="project"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            View
          </motion.span>
        )}
        {cursorState === "drag" && (
          <motion.span
            key="drag"
            className="text-foreground"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            ← →
          </motion.span>
        )}
        {cursorState === "explore" && (
          <motion.span
            key="explore"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            Explore
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
