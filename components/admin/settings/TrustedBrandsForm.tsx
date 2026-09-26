"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import {
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Pencil,
  X,
} from "lucide-react"
import { FileUpload } from "@/components/ui/file-upload"
import { TrustedBrandValues } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { ConfirmAlert } from "@/components/ui/confirm-alert"
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/lib/uploadToCloudinary"

export function TrustedBrandsForm({
  initialData,
}: {
  initialData?: { trustedBrands?: TrustedBrandValues[] }
}) {
  const [brands, setBrands] = useState<TrustedBrandValues[]>(
    initialData?.trustedBrands || []
  )
  const [isUploading, setIsUploading] = useState(false)

  // State for the "Add/Edit Brand" form
  const [newBrandName, setNewBrandName] = useState("")
  const [newBrandFile, setNewBrandFile] = useState<File | string | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(
    null
  )
  const [isDeleting, setIsDeleting] = useState(false)

  const handleAddOrEditBrand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBrandName || !newBrandFile) {
      toast.error("Please provide both a name and a logo.")
      return
    }

    setIsUploading(true)
    try {
      // Upload via our reusable Cloudinary utility
      let finalUrl = ""
      if (newBrandFile instanceof File) {
        finalUrl = await uploadToCloudinary(
          newBrandFile,
          "thresh-studio/brands"
        )
      } else {
        finalUrl = newBrandFile as string
      }

      const brandData: TrustedBrandValues = {
        name: newBrandName,
        logoUrl: finalUrl,
        isActive: true,
        order: editIndex !== null ? brands[editIndex].order : brands.length,
      }

      let updated: TrustedBrandValues[]
      if (editIndex !== null) {
        updated = [...brands]
        updated[editIndex] = brandData
        setBrands(updated)
      } else {
        updated = [...brands, brandData]
        setBrands(updated)
      }

      handleCancelEdit()
      // Auto-save to database immediately
      await saveBrandsToDatabase(updated)
    } catch (error) {
      toast.error(
        editIndex !== null ? "Failed to update brand" : "Failed to add brand"
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditClick = (index: number) => {
    setEditIndex(index)
    setNewBrandName(brands[index].name)
    setNewBrandFile(brands[index].logoUrl)
  }

  const handleCancelEdit = () => {
    setEditIndex(null)
    setNewBrandName("")
    setNewBrandFile(null)
  }

  const handleRemoveBrand = async () => {
    if (confirmDeleteIndex === null) return
    setIsDeleting(true)
    const updated = brands.filter((_, i) => i !== confirmDeleteIndex)
    setBrands(updated)
    await saveBrandsToDatabase(updated)
    setIsDeleting(false)
    setConfirmDeleteIndex(null)
  }

  const saveBrandsToDatabase = async (updatedBrands: TrustedBrandValues[]) => {
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trustedBrands: updatedBrands }),
      })

      if (!res.ok) throw new Error("Failed to save brands")

      // Clean up deleted images from Cloudinary storage
      const initialUrls = (initialData?.trustedBrands || []).map(
        (b: TrustedBrandValues) => b.logoUrl
      )
      const currentUrls = updatedBrands.map((b) => b.logoUrl)
      const deletedUrls = initialUrls.filter(
        (url: string) => !currentUrls.includes(url)
      )

      deletedUrls.forEach((url: string) => {
        deleteFromCloudinary(url).catch(console.error)
      })

      toast.success("Brands updated successfully")
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Failed to synchronize with database"
      )
    }
  }

  return (
    <div className="max-w-6xl space-y-10">
      <div className="border-b border-neutral-800/50 pb-6">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Trusted Brands
        </h3>
        <p className="max-w-xl text-[15px] text-neutral-400">
          Manage the brand logos displayed in the client feedback section of
          your site.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ADD / EDIT BRAND COLUMN */}
        <div className="space-y-6 lg:col-span-1">
          <div className="relative rounded-2xl border border-neutral-800/60 bg-neutral-900/30 p-5 shadow-inner">
            {editIndex !== null && (
              <button
                onClick={handleCancelEdit}
                className="absolute top-4 right-4 text-neutral-500 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <h4 className="mb-6 flex items-center gap-2 text-sm font-bold tracking-wider text-white uppercase">
              {editIndex !== null ? (
                <>
                  <Pencil className="h-4 w-4 text-brand-300" /> Edit Brand
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 text-brand-300" /> Add New Brand
                </>
              )}
            </h4>
            <form onSubmit={handleAddOrEditBrand} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                  Brand Name
                </label>
                <Input
                  placeholder="e.g. Nike, Apple"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  className="h-11 border-neutral-800/60 bg-neutral-900/40 text-white placeholder:text-neutral-600"
                />
              </div>
              <div className="space-y-2.5">
                <label className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                  Brand Logo
                </label>
                <FileUpload
                  value={newBrandFile}
                  onChange={setNewBrandFile}
                  accept="image/*"
                  maxSize={2 * 1024 * 1024} // 2MB
                  description="Upload SVG or PNG (Max 2MB)"
                  className="min-h-[160px]"
                />
              </div>
              <button
                type="submit"
                disabled={isUploading || !newBrandName || !newBrandFile}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-800 py-3 text-[13px] font-medium tracking-wider text-white uppercase transition-colors hover:bg-neutral-700 disabled:opacity-50"
              >
                {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isUploading
                  ? "Saving..."
                  : editIndex !== null
                    ? "Save Changes"
                    : "Upload & Add"}
              </button>
            </form>
          </div>
        </div>

        {/* EXISTING BRANDS LIST */}
        <div className="space-y-6 lg:col-span-2">
          <h4 className="flex items-center gap-2 text-sm font-bold tracking-wider text-neutral-400 uppercase">
            <ImageIcon className="h-4 w-4" /> Active Brands ({brands.length})
          </h4>

          {brands.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-800/60 bg-neutral-900/20 p-12 text-neutral-500">
              <ImageIcon className="mb-3 h-12 w-12 opacity-20" />
              <p>No brands added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-6 shadow-inner transition-colors hover:bg-neutral-800/60"
                >
                  {/* Grip for future reordering visually */}
                  <div className="absolute top-3 left-3 cursor-grab text-neutral-500 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                    <GripVertical className="h-4 w-4" />
                  </div>

                  {/* Edit/Delete Actions */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 transition-all md:opacity-0 md:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleEditClick(idx)}
                      className="rounded-md bg-neutral-800/80 p-1.5 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteIndex(idx)}
                      className="rounded-md bg-red-500/10 p-1.5 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md transition-all duration-300"
                  />

                  {/* Name overlay */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-black/90 to-transparent p-3 pt-8 transition-transform duration-300 md:translate-y-full md:group-hover:translate-y-0">
                    <p className="truncate text-center text-[11px] font-bold tracking-wider text-white uppercase">
                      {brand.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmAlert
        isOpen={confirmDeleteIndex !== null}
        onClose={() => setConfirmDeleteIndex(null)}
        onConfirm={handleRemoveBrand}
        title="Remove Brand?"
        description="Are you sure you want to remove this trusted brand? This will permanently delete the logo from your storage."
        isLoading={isDeleting}
      />
    </div>
  )
}
