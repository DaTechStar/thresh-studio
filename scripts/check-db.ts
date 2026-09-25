import { SiteSettings } from "../models/SiteSettings"
import dbConnect from "../lib/db"

async function main() {
  await dbConnect()
  console.log("Current DB State:")
  console.log(JSON.stringify(await SiteSettings.findOne().lean(), null, 2))
  process.exit(0)
}
main()
