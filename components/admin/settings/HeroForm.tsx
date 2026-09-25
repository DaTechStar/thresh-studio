"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/lib/uploadToCloudinary"

import { SiteSettingsValues } from "@/lib/schemas"

export function HeroForm({
  initialData,
}: {
  initialData?: Partial<SiteSettingsValues>
}) {
  const [file, setFile] = useState<File | string | null>(
    initialData?.heroVideoUrl || null
  )
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error("Please upload a video first.")
      return
    }
    setIsLoading(true)

    try {
      let finalUrl = file as string

      // Upload via our reusable Cloudinary utility if it's a new file
      if (file instanceof File) {
        finalUrl = await uploadToCloudinary(file, "thresh-studio/hero")
      }

      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroVideoUrl: finalUrl }),
      })

      if (!res.ok) throw new Error("Failed to save hero settings")

      // Clean up the old video from storage if it was replaced
      if (initialData?.heroVideoUrl && initialData.heroVideoUrl !== finalUrl) {
        deleteFromCloudinary(initialData.heroVideoUrl).catch(console.error)
      }

      toast.success("Hero showreel saved successfully!")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save hero showreel"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-4xl space-y-10">
      <div className="border-b border-neutral-800/50 pb-6">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Hero Showreel
        </h3>
        <p className="max-w-xl text-[15px] text-neutral-400">
          Upload and manage the main background video for your landing page.
          High-quality MP4 or WebM is recommended.
        </p>
      </div>

      <div className="space-y-4">
        <FileUpload
          value={file}
          onChange={(f) => setFile(f)}
          accept="video/*"
          maxSize={50 * 1024 * 1024} // 50MB limit
          description="Upload a web-optimized video for your hero section. (Max 50MB)"
        />
      </div>

      <div className="flex border-t border-neutral-800/50 pt-8 md:justify-end">
        <button
          type="submit"
          disabled={isLoading || !file}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-200 px-8 py-3.5 text-[13px] font-bold tracking-widest text-neutral-950 uppercase shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
          <span className="relative z-10 flex items-center gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Showreel
          </span>
        </button>
      </div>
    </form>
  )
}
