import React, { useState } from "react";

interface VimeoEmbedProps {
  vimeoId: string;
  className?: string;
}

export function VimeoEmbed({ vimeoId, className = "" }: VimeoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Using background=1 automatically mutes, loops, hides UI, and auto-plays
  // dnt=1 stops tracking, autopause=0 prevents multiple videos on the same page from pausing each other
  const src = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&dnt=1&autopause=0`;

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none bg-neutral-900 ${className}`}>
      {/* Dark skeleton placeholder while iframe loads */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-neutral-900 animate-pulse" />
      )}
      <iframe
        src={src}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        onLoad={() => setIsLoaded(true)}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover z-10 transition-opacity duration-1000 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ aspectRatio: "16/9" }}
      />
    </div>
  );
}
