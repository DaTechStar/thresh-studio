import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Project } from "@/models/Project"
import { serializeProject } from "@/lib/serializers"

export async function GET() {
  try {
    await dbConnect()

    // Only fetch published projects for the public API, sorted by order
    const projects = await Project.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 })
      .lean()

    return NextResponse.json(projects.map(serializeProject))
  } catch (error) {
    console.error("[PUBLIC_PROJECTS_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
