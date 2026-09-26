import { useQuery } from "@tanstack/react-query"
import { TestimonialFormValues } from "@/lib/schemas"

export interface TestimonialData extends TestimonialFormValues {
  id: string
}

export function useTestimonials() {
  const { data, isLoading, error } = useQuery<TestimonialData[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await fetch("/api/public/testimonials")
      if (!res.ok) throw new Error("Failed to fetch testimonials")
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })

  return { data, isLoading, error }
}
