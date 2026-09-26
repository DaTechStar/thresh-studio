import React from "react"
import { Toaster } from "@/components/ui/sonner"
import { AdminBackground } from "@/components/admin/AdminBackground"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-background font-sans text-neutral-100 selection:bg-brand-500/30">
      <AdminBackground />

      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
      <Toaster position="top-right" />
    </div>
  )
}
