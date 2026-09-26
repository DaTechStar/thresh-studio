import { NextResponse } from "next/server"
import {
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/services/testimonialService"
import { auth } from "@/auth"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { id } = await params
    const testimonial = await getTestimonialById(id)
    if (!testimonial) {
      return new NextResponse("Not Found", { status: 404 })
    }
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("[TESTIMONIAL_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { id } = await params
    const body = await req.json()
    const testimonial = await updateTestimonial(id, body)
    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("[TESTIMONIAL_PUT]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { id } = await params
    await deleteTestimonial(id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[TESTIMONIAL_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
