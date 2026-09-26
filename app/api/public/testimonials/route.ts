import { NextResponse } from "next/server"
import { getTestimonials } from "@/lib/services/testimonialService"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const testimonials = await getTestimonials({ activeOnly: true })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("[PUBLIC_TESTIMONIALS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
