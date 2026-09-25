import React from "react"

interface VimeoEmbedProps {
  vimeoId: string
  className?: string
}

export function VimeoEmbed({ vimeoId, className = "" }: VimeoEmbedProps) {
  // Swapped to placeholders to eliminate iframe lag.
  // Ready to be replaced by native HTML5 <video> tags connected to Cloudinary.
  return (
    <div
      className={`pointer-events-none relative flex h-full w-full items-center justify-center overflow-hidden border border-neutral-800 bg-neutral-900 ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-800" />
        <span className="font-mono text-xs tracking-widest text-neutral-600 uppercase">
          Cloudinary Video Placeholder ({vimeoId})
        </span>
      </div>
    </div>
  )
}
