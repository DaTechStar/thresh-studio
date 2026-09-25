import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface PageSkeletonProps {
  variant: "table" | "form" | "dashboard" | "grid"
}

export function PageSkeleton({ variant }: PageSkeletonProps) {
  if (variant === "dashboard") {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <Skeleton className="h-32 w-1/3 bg-neutral-800" />
          <Skeleton className="h-32 w-1/3 bg-neutral-800" />
          <Skeleton className="h-32 w-1/3 bg-neutral-800" />
        </div>
        <Skeleton className="h-[400px] w-full bg-neutral-800" />
      </div>
    )
  }

  if (variant === "table") {
    return (
      <div className="space-y-4">
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-48 bg-neutral-800" />
          <Skeleton className="h-10 w-32 bg-neutral-800" />
        </div>

        <div className="overflow-hidden rounded-lg border border-neutral-800">
          <div className="flex gap-4 border-b border-neutral-800 bg-neutral-900/50 p-4">
            <Skeleton className="h-4 w-12 bg-neutral-700" />
            <Skeleton className="h-4 w-1/4 bg-neutral-700" />
            <Skeleton className="h-4 w-1/4 bg-neutral-700" />
            <Skeleton className="ml-auto h-4 w-24 bg-neutral-700" />
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex gap-4 border-b border-neutral-800 p-4 last:border-b-0"
            >
              <Skeleton className="h-12 w-16 rounded-md bg-neutral-800" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/3 bg-neutral-800" />
                <Skeleton className="h-4 w-1/4 bg-neutral-800" />
              </div>
              <Skeleton className="my-auto h-8 w-24 bg-neutral-800" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === "form") {
    return (
      <div className="max-w-3xl space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-neutral-800" />
          <Skeleton className="h-4 w-96 bg-neutral-800" />
        </div>

        <div className="space-y-6 rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-neutral-800" />
            <Skeleton className="h-12 w-full bg-neutral-800" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-neutral-800" />
            <Skeleton className="h-12 w-full bg-neutral-800" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-neutral-800" />
            <Skeleton className="h-32 w-full bg-neutral-800" />
          </div>
        </div>
      </div>
    )
  }

  // default grid
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-[250px] w-full rounded-xl bg-neutral-800" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 bg-neutral-800" />
            <Skeleton className="h-4 w-1/2 bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  )
}
