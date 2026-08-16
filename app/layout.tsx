import { Outfit, JetBrains_Mono } from "next/font/google"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { CursorProvider } from "@/components/cursor/CursorContext"
import { CustomCursor } from "@/components/cursor/CustomCursor"
import { Navbar } from "@/components/sections/Navbar"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", outfit.variable)}
    >
      <body suppressHydrationWarning>
        {/* Global Cinematic Film Grain */}
        <div className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full opacity-100">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <ThemeProvider>
          <CursorProvider>
            <SmoothScroll>
              <Navbar />
              {children}
              <CustomCursor />
            </SmoothScroll>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
