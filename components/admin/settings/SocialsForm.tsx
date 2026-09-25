"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Camera, Briefcase, MessageCircle, Video } from "lucide-react"
import { siteSettingsSchema, SiteSettingsValues } from "@/lib/schemas"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SocialsForm({
  initialData,
}: {
  initialData: Partial<SiteSettingsValues>
}) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SiteSettingsValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      instagramUrl: initialData?.instagramUrl || "",
      twitterUrl: initialData?.twitterUrl || "",
      linkedinUrl: initialData?.linkedinUrl || "",
      vimeoUrl: initialData?.vimeoUrl || "",
    },
  })

  const onSubmit = async (data: SiteSettingsValues) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to update socials")
      toast.success("Social links updated successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-3xl space-y-10"
    >
      <div className="border-b border-neutral-800/50 pb-6">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Social Media Links
        </h3>
        <p className="max-w-xl text-[15px] text-neutral-400">
          Update the destinations for the social media icons displayed in your
          footer and contact sections.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        <Field className="group space-y-2.5">
          <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
            Instagram
          </FieldLabel>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Camera className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
            </div>
            <Input
              placeholder="https://instagram.com/threshstudio"
              className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
              {...form.register("instagramUrl")}
            />
          </div>
          <FieldError
            errors={[
              form.formState.errors.instagramUrl as unknown as {
                message?: string
              },
            ]}
          />
        </Field>

        <Field className="group space-y-2.5">
          <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
            Twitter / X
          </FieldLabel>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <MessageCircle className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
            </div>
            <Input
              placeholder="https://twitter.com/threshstudio"
              className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
              {...form.register("twitterUrl")}
            />
          </div>
          <FieldError
            errors={[
              form.formState.errors.twitterUrl as unknown as {
                message?: string
              },
            ]}
          />
        </Field>

        <Field className="group space-y-2.5">
          <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
            LinkedIn
          </FieldLabel>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Briefcase className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
            </div>
            <Input
              placeholder="https://linkedin.com/company/threshstudio"
              className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
              {...form.register("linkedinUrl")}
            />
          </div>
          <FieldError
            errors={[
              form.formState.errors.linkedinUrl as unknown as {
                message?: string
              },
            ]}
          />
        </Field>

        <Field className="group space-y-2.5">
          <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
            Vimeo
          </FieldLabel>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Video className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
            </div>
            <Input
              placeholder="https://vimeo.com/threshstudio"
              className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
              {...form.register("vimeoUrl")}
            />
          </div>
          <FieldError
            errors={[
              form.formState.errors.vimeoUrl as unknown as { message?: string },
            ]}
          />
        </Field>
      </div>

      <div className="flex border-t border-neutral-800/50 pt-8 md:justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-200 px-8 py-3.5 text-[13px] font-bold tracking-widest text-neutral-950 uppercase shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
          <span className="relative z-10 flex items-center gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Social Links
          </span>
        </button>
      </div>
    </form>
  )
}
