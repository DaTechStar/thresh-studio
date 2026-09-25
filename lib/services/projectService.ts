/**
 * projectService.ts
 *
 * Single source of truth for all Project DB queries.
 * Used by /api/admin/projects and server components.
 */
import dbConnect from "@/lib/db"
import { Project } from "@/models/Project"
import { serializeProject } from "@/lib/serializers"
import { ProjectFormValues } from "@/lib/schemas"

async function generateUniqueSlug(text: string, excludeId?: string) {
  const baseSlug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
  let currentSlug = baseSlug
  let counter = 1

  while (true) {
    const query: Record<string, unknown> = { slug: currentSlug }
    if (excludeId) query._id = { $ne: excludeId }

    const existing = await Project.findOne(query)
    if (!existing) return currentSlug

    currentSlug = `${baseSlug}-${counter}`
    counter++
  }
}

export async function getProjects(options: { publishedOnly?: boolean } = {}) {
  await dbConnect()

  const query = options.publishedOnly ? { isPublished: true } : {}
  const projects = await Project.find(query)
    .sort({ order: 1, createdAt: -1 })
    .lean()

  return projects.map(serializeProject)
}

export async function getProjectById(id: string) {
  await dbConnect()
  const project = await Project.findById(id).lean()
  return serializeProject(project)
}

export async function getProjectBySlug(slug: string) {
  await dbConnect()
  const project = await Project.findOne({ slug, isPublished: true }).lean()
  return serializeProject(project)
}

export async function createProject(data: ProjectFormValues) {
  await dbConnect()

  data.slug = await generateUniqueSlug(data.slug || data.title)

  const project = new Project(data)
  await project.save()
  return serializeProject(project.toJSON())
}

export async function updateProject(
  id: string,
  data: Partial<ProjectFormValues>
) {
  await dbConnect()

  if (data.slug !== undefined || data.title) {
    let textToSlugify = data.slug || data.title
    if (!textToSlugify) {
      const existing = await Project.findById(id)
      textToSlugify = existing?.title || "project"
    }
    data.slug = await generateUniqueSlug(textToSlugify as string, id)
  }

  const project = await Project.findByIdAndUpdate(id, data, {
    new: true,
  }).lean()
  return serializeProject(project)
}

export async function deleteProject(id: string) {
  await dbConnect()
  await Project.findByIdAndDelete(id)
  return { success: true }
}
