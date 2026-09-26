import { NextResponse } from "next/server"
import {
  getTestimonials,
  createTestimonial,
} from "@/lib/services/testimonialService"
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const testimonials = await getTestimonials()
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("[TESTIMONIALS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const body = await req.json()
    const testimonial = await createTestimonial(body)
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("[TESTIMONIALS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
