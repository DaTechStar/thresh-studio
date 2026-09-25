import React, { Suspense } from "react"
import { WorkClient } from "./WorkClient"

export const metadata = {
  title: "Selected Archive | Thresh Studio",
  description:
    "A curated collection of our most iconic digital experiences, product motion, and cinematic campaigns.",
}

export default function WorkPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-background" />}>
      <WorkClient />
    </Suspense>
  )
}
