import { z } from "zod"

export const projectFormSchema = z.object({
  // 1. HERO
  category: z.string().min(1, "Category is required"),
  year: z.string().min(1, "Year is required"),
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional().or(z.literal("")),
  tagline: z.string().min(1, "Tagline is required"),
  videoUrl: z.string().optional().or(z.literal("")),

  // 2. STATS
  stats: z.array(
    z.object({
      label: z.string().min(1, "Label is required"),
      value: z.string().min(1, "Value is required"),
    })
  ),

  // 3. OVERVIEW
  description: z.string().min(1, "Description is required"),
  services: z.array(z.string()),
  deliverables: z.array(z.string()),

  // 4. CHALLENGE / APPROACH
  challenge: z.string().min(1, "Challenge text is required"),
  approach: z.string().min(1, "Approach text is required"),

  // 5. GALLERY
  gallery: z.array(z.string().url()),

  // 6. OUTCOME
  outcome: z.string().min(1, "Outcome text is required"),

  // METADATA
  isPublished: z.boolean(),
  order: z.number(),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>

export const siteSettingsSchema = z.object({
  heroVideoUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  instagramUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  twitterUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  vimeoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  trustedBrands: z.array(z.any()).optional(),
})
export type SiteSettingsValues = z.infer<typeof siteSettingsSchema>

export const trustedBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logoUrl: z.string().min(1, "Logo is required").url("Must be a valid URL"),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
})
export type TrustedBrandValues = z.infer<typeof trustedBrandSchema>

export const accountSettingsSchema = z
  .object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false
      }
      return true
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  )
export type AccountSettingsValues = z.infer<typeof accountSettingsSchema>
