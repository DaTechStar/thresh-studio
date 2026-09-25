import { NextResponse } from "next/server"
import { getSiteSettings } from "@/lib/services/settingsService"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const settings = await getSiteSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("[GET /api/public/settings]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
