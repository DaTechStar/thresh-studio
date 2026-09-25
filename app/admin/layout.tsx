import React from "react"
import { Toaster } from "@/components/ui/sonner"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100">
      {/* 
        This nested layout overrides the global cinematic styles,
        giving us a clean, native-feeling dashboard environment 
        free of smooth scroll or cursor hijacking.
      */}
      {children}
      <Toaster position="top-right" />
    </div>
  )
}
