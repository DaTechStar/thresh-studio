import { NextResponse } from "next/server"
import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import { siteSettingsSchema } from "@/lib/schemas"
import {
  getSiteSettings,
  updateSiteSettings,
} from "@/lib/services/settingsService"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await auth()
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const settings = await getSiteSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("[GET /api/admin/settings]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()

    // Always validate request bodies with Zod .safeParse()
    const parsed = siteSettingsSchema.partial().safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      )
    }

    await dbConnect()
    const updatedSettings = await updateSiteSettings(parsed.data)
    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error("[PATCH /api/admin/settings]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
