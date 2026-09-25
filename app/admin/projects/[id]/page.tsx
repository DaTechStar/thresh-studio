import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { getProjectById } from "@/lib/services/projectService"
import { ProjectForm } from "@/components/admin/projects/ProjectForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AdminNav } from "@/components/admin/AdminNav"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export const metadata = {
  title: "Edit Project | Thresh Studio Admin",
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const { id } = await params
  const project = await getProjectById(id)

  if (!project) return notFound()

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav />
        <main className="mx-auto w-full max-w-7xl space-y-8 p-6 pb-20 md:p-10">
          <div className="max-w-6xl">
            <div className="mb-10">
              <Link
                href="/admin/projects"
                className="mb-6 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-500 uppercase transition-colors hover:text-brand-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
              </Link>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
                Edit Project
              </h1>
              <p className="text-neutral-400">
                Update the details for{" "}
                <span className="font-medium text-white">{project.title}</span>.
              </p>
            </div>
            <ProjectForm initialData={project} />
          </div>
        </main>
      </div>
    </div>
  )
}
