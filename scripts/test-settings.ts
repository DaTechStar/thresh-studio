import {
  getSiteSettings,
  updateSiteSettings,
} from "../lib/services/settingsService"
import { SiteSettings } from "../models/SiteSettings"
import dbConnect from "../lib/db"

async function main() {
  await dbConnect()

  console.log("Current Settings before update:")
  console.log(await SiteSettings.findOne().lean())

  console.log("\nAttempting to update settings...")
  const updated = await updateSiteSettings({
    heroVideoUrl: "https://test.com/video.mp4",
    trustedBrands: [
      {
        name: "Test Brand",
        logoUrl: "https://test.com/logo.png",
        isActive: true,
        order: 0,
      },
    ],
  })

  console.log("\nResult returned from updateSiteSettings:")
  console.log(updated)

  console.log("\nActual Database state after save:")
  const inDb = await SiteSettings.findOne().lean()
  console.log(inDb)

  process.exit(0)
}

main().catch(console.error)
