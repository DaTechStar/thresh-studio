"use client"

import { SiteSettingsValues } from "@/lib/schemas"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { PageSkeleton } from "@/components/shared/PageSkeleton"
import { FetchError } from "@/components/shared/FetchError"
import { EmptyState } from "@/components/shared/EmptyState"
import { AccountForm } from "@/components/admin/settings/AccountForm"
import { SocialsForm } from "@/components/admin/settings/SocialsForm"
import { HeroForm } from "@/components/admin/settings/HeroForm"
import { TrustedBrandsForm } from "@/components/admin/settings/TrustedBrandsForm"
import { toast } from "sonner"

export function SettingsClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabParam = searchParams.get("tab") as string
  const initialTab = (
    ["account", "hero", "brands", "socials"].includes(tabParam)
      ? tabParam
      : "account"
  ) as "account" | "hero" | "brands" | "socials"

  const [activeTab, setActiveTab] = useState<
    "account" | "hero" | "brands" | "socials"
  >(initialTab)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [settings, setSettings] = useState<Partial<SiteSettingsValues> | null>(
    null
  )

  const fetchSettings = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const res = await fetch("/api/admin/settings", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setSettings(data)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSettings()
  }, [])

  // Sync active tab to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.get("tab") !== activeTab) {
      params.set("tab", activeTab)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [activeTab, pathname, router, searchParams])

  if (isLoading) return <PageSkeleton variant="form" />
  if (isError)
    return (
      <FetchError
        onRetry={fetchSettings}
        message="Failed to load settings data. Please try again."
      />
    )

  const tabs = [
    { id: "account", label: "Account" },
    { id: "hero", label: "Hero Section" },
    { id: "brands", label: "Trusted Brands" },
    { id: "socials", label: "Social Links" },
  ]

  return (
    <div className="space-y-8">
      {/* Horizontal Tabs */}
      <div className="hide-scrollbar flex overflow-x-auto border-b border-neutral-800">
        <div className="flex gap-2 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "account" | "hero" | "brands" | "socials"
                )
              }
              className={`border-b-2 px-6 py-3 text-sm font-medium tracking-wider whitespace-nowrap uppercase transition-colors ${
                activeTab === tab.id
                  ? "border-brand-200 text-brand-200"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-6">
        {activeTab === "account" && <AccountForm />}

        {activeTab === "hero" && <HeroForm initialData={settings || {}} />}

        {activeTab === "brands" && (
          <TrustedBrandsForm initialData={settings || {}} />
        )}

        {activeTab === "socials" && (
          <SocialsForm initialData={settings || {}} />
        )}
      </div>
    </div>
  )
}
