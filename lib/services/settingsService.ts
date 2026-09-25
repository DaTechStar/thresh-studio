import dbConnect from "@/lib/db"
import { SiteSettings } from "@/models/SiteSettings"
import { serializeSiteSettings, LeanDoc } from "@/lib/serializers"
import { SiteSettingsValues } from "@/lib/schemas"
import { ISiteSettings } from "@/models/SiteSettings"

export async function getSiteSettings() {
  await dbConnect()

  let settings = await SiteSettings.findOne().lean()

  // Create if it doesn't exist
  if (!settings) {
    const newSettings = new SiteSettings({})
    await newSettings.save()
    settings = newSettings.toJSON()
  }

  return serializeSiteSettings(settings as LeanDoc<ISiteSettings>)
}

export async function updateSiteSettings(data: Partial<SiteSettingsValues>) {
  await dbConnect()

  let settings = await SiteSettings.findOne()
  if (!settings) {
    settings = new SiteSettings(data)
  } else {
    settings.set(data)

    // Mongoose requires manual marking of modifications for Mixed types or nested arrays
    if (data.trustedBrands !== undefined) {
      settings.markModified("trustedBrands")
    }
  }

  await settings.save()
  return serializeSiteSettings(settings.toJSON() as LeanDoc<ISiteSettings>)
}
