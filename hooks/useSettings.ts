import { useQuery } from "@tanstack/react-query"

export interface TrustedBrandValues {
  name: string
  logoUrl: string
  isActive: boolean
  order: number
}

export interface SiteSettingsData {
  heroVideoUrl?: string
  trustedBrands?: TrustedBrandValues[]
  instagramUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  vimeoUrl?: string
}

export function useSettings() {
  const { data, isLoading, error } = useQuery<SiteSettingsData>({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      const res = await fetch("/api/public/settings")
      if (!res.ok) throw new Error("Failed to fetch settings")
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  return { data, isLoading, error }
}
