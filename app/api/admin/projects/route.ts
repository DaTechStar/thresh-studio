import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { projectFormSchema } from "@/lib/schemas"
import { getProjects, createProject } from "@/lib/services/projectService"

export async function GET() {
  try {
    const session = await auth()
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("[GET /api/admin/projects]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const parsed = projectFormSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      )
    }

    const newProject = await createProject(parsed.data)
    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("[POST /api/admin/projects]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
