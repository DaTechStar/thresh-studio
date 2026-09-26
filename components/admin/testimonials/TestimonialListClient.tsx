"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Plus,
  Pencil,
  Trash2,
  MessageSquare,
  Loader2,
  Search,
  Eye,
  EyeOff,
} from "lucide-react"
import Image from "next/image"

import { TestimonialFormValues } from "@/lib/schemas"
import { deleteFromCloudinary } from "@/lib/uploadToCloudinary"
import { ConfirmAlert } from "@/components/ui/confirm-alert"

export function TestimonialListClient({
  initialTestimonials,
}: {
  initialTestimonials: (Partial<TestimonialFormValues> & { id?: string })[]
}) {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [searchQuery, setSearchQuery] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setTogglingId(id)
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      })
      if (!res.ok) throw new Error("Failed to update status")

      setTestimonials(
        testimonials.map((t) =>
          t.id === id ? { ...t, isActive: !currentStatus } : t
        )
      )
      toast.success(
        currentStatus ? "Testimonial hidden" : "Testimonial visible"
      )
      router.refresh()
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async () => {
    if (!confirmDeleteId) return
    const id = confirmDeleteId

    setDeletingId(id)
    try {
      const testimonialToDelete = testimonials.find((t) => t.id === id)

      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete testimonial")

      if (testimonialToDelete?.avatar) {
        try {
          await deleteFromCloudinary(testimonialToDelete.avatar)
        } catch (e) {
          console.error("Failed to delete avatar from Cloudinary", e)
        }
      }

      setTestimonials(testimonials.filter((t) => t.id !== id))
      toast.success("Testimonial deleted successfully")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete testimonial"
      )
    } finally {
      setDeletingId(null)
      setConfirmDeleteId(null)
    }
  }

  const filteredTestimonials = testimonials.filter((t) => {
    if (!t) return false
    return (
      (t.author?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (t.role?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    )
  })

  return (
    <div className="space-y-6">
      {/* TOOLBAR */}
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by author or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 w-full rounded-2xl border border-neutral-800 bg-neutral-900/40 pr-4 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50"
          />
        </div>

        <Link
          href="/admin/testimonials/new"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand-200 px-8 text-[13px] font-bold tracking-widest text-neutral-950 uppercase shadow-[0_0_20px_rgba(0,211,218,0.15)] transition-all hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-[0_0_30px_rgba(0,211,218,0.3)]"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Link>
      </div>

      {filteredTestimonials.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-neutral-800 bg-neutral-900/20 p-20 text-neutral-500">
          <MessageSquare className="mb-6 h-16 w-16 opacity-20" />
          <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
            No Testimonials Found
          </h3>
          <p className="font-mono text-sm tracking-widest uppercase">
            Add a client review or adjust search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-neutral-800/60 bg-neutral-900/30 p-6 shadow-inner backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/10 md:p-8"
            >
              <button
                onClick={() =>
                  handleToggleActive(
                    testimonial.id as string,
                    testimonial.isActive || false
                  )
                }
                disabled={togglingId === testimonial.id}
                title={
                  testimonial.isActive ? "Hide testimonial" : "Show testimonial"
                }
                className="absolute top-5 right-5 rounded-full border border-neutral-800/60 bg-neutral-950 p-2 text-neutral-400 transition-colors hover:border-brand-500/50 hover:text-brand-300 disabled:opacity-50"
              >
                {togglingId === testimonial.id ? (
                  <Loader2 className="h-4 w-4 animate-spin text-brand-300" />
                ) : testimonial.isActive ? (
                  <Eye className="h-4 w-4 text-brand-300" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>

              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-neutral-800">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author || "Avatar"}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-800" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {testimonial.author}
                  </h4>
                  <p className="text-xs tracking-wider text-brand-300 uppercase">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <p className="mb-8 line-clamp-4 flex-1 text-sm leading-relaxed text-neutral-400">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="mt-auto flex items-center gap-3 border-t border-neutral-800/60 pt-6">
                <Link
                  href={`/admin/testimonials/${testimonial.id}`}
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-[11px] font-bold tracking-widest text-black uppercase transition-colors hover:bg-brand-200"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Link>
                <button
                  onClick={() => setConfirmDeleteId(testimonial.id as string)}
                  disabled={deletingId === testimonial.id}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-50"
                >
                  {deletingId === testimonial.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmAlert
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial?"
        description="Are you sure you want to delete this testimonial? This action cannot be undone."
        isLoading={!!deletingId}
      />
    </div>
  )
}
