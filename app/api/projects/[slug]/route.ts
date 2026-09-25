import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Project } from "@/models/Project"
import { serializeProject } from "@/lib/serializers"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    await dbConnect()

    const project = await Project.findOne({ slug, isPublished: true }).lean()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(serializeProject(project))
  } catch (error) {
    console.error("[PUBLIC_PROJECT_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
