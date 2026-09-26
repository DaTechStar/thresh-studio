import { ProjectFormValues } from "@/lib/schemas"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getProjects } from "@/lib/services/projectService"
import { ProjectListClient } from "@/components/admin/projects/ProjectListClient"
import { AdminNav } from "@/components/admin/AdminNav"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export const metadata = {
  title: "Projects | Thresh Studio Admin",
}

export default async function ProjectsPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  const projects = await getProjects()

  return (
    <div className="flex min-h-screen text-neutral-100">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav />
        <main className="mx-auto w-full max-w-7xl space-y-8 p-6 pb-20 md:p-10">
          <div className="max-w-6xl">
            <div className="mb-10">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
                Projects
              </h1>
              <p className="text-neutral-400">
                Manage your portfolio case studies.
              </p>
            </div>
            <ProjectListClient
              initialProjects={
                projects.filter(Boolean) as (Partial<ProjectFormValues> & {
                  id?: string
                })[]
              }
            />
          </div>
        </main>
      </div>
    </div>
  )
}
