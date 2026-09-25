import React from "react"
import Link from "next/link"
import { Plus, Video, Eye, EyeOff, Edit, Trash2 } from "lucide-react"
import { getProjects } from "@/lib/services/projectService"
import { AdminNav } from "@/components/admin/AdminNav"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { EmptyState } from "@/components/shared/EmptyState"
import { ProjectFormValues } from "@/lib/schemas"

export const metadata = {
  title: "Admin Dashboard | Thresh Studio",
}

export default async function DashboardPage() {
  const projects = await getProjects()

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNav />
        <main className="mx-auto w-full max-w-7xl space-y-8 p-6 pb-20 md:p-10">
          <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-widest text-white uppercase">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-neutral-400">
                Manage your portfolio projects and site content.
              </p>
            </div>

            <Link
              href="/admin/projects/new"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-200 px-6 py-3 text-sm font-bold tracking-widest text-neutral-950 uppercase shadow-lg shadow-brand-500/20 transition-colors hover:bg-brand-100"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          </header>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
              <div className="mb-2 flex items-center gap-4 text-brand-500">
                <Video className="h-6 w-6" />
                <h3 className="text-lg font-medium tracking-wider text-neutral-300 uppercase">
                  Total Projects
                </h3>
              </div>
              <p className="text-4xl font-bold text-white">{projects.length}</p>
            </div>
            <div className="flex flex-col justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
              <div className="mb-2 flex items-center gap-4 text-brand-300">
                <Eye className="h-6 w-6" />
                <h3 className="text-lg font-medium tracking-wider text-neutral-300 uppercase">
                  Published
                </h3>
              </div>
              <p className="text-4xl font-bold text-white">
                {projects.filter((p) => p?.isPublished).length}
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
              <div className="mb-2 flex items-center gap-4 text-neutral-500">
                <EyeOff className="h-6 w-6" />
                <h3 className="text-lg font-medium tracking-wider text-neutral-300 uppercase">
                  Drafts
                </h3>
              </div>
              <p className="text-4xl font-bold text-white">
                {projects.filter((p) => !p?.isPublished).length}
              </p>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30">
            <div className="border-b border-neutral-800 bg-neutral-900/50 px-6 py-5">
              <h2 className="text-lg font-bold tracking-widest text-white uppercase">
                Recent Projects
              </h2>
            </div>

            {projects.length === 0 ? (
              <div className="p-10">
                <EmptyState
                  title="No projects yet"
                  description="Your portfolio is currently empty. Create your first project to get started."
                  action={{
                    label: "Create Project",
                    href: "/admin/projects/new",
                  }}
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="border-b border-neutral-800 bg-neutral-900/30 text-xs tracking-wider text-neutral-500 uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">Project</th>
                      <th className="px-6 py-4 font-medium">Category</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/50">
                    {projects.map(
                      (project) =>
                        project && (
                          <tr
                            key={project.id}
                            className="transition-colors hover:bg-neutral-800/20"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                {project.videoUrl ||
                                (project.gallery && project.gallery[0]) ? (
                                  project.videoUrl ? (
                                    <video
                                      src={project.videoUrl}
                                      className="h-8 w-12 rounded bg-neutral-800 object-cover"
                                      muted
                                      playsInline
                                    />
                                  ) : (
                                    <img
                                      src={project.gallery[0]}
                                      alt={project.title}
                                      className="h-8 w-12 rounded bg-neutral-800 object-cover"
                                    />
                                  )
                                ) : (
                                  <div className="flex h-8 w-12 items-center justify-center rounded bg-neutral-800">
                                    <Video className="h-4 w-4 text-neutral-500" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-neutral-200">
                                    {project.title}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {project.slug}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-neutral-400">
                              {project.category}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                                  project.isPublished
                                    ? "border-brand-500/20 bg-brand-500/10 text-brand-300"
                                    : "border-neutral-500/20 bg-neutral-500/10 text-neutral-400"
                                }`}
                              >
                                {project.isPublished ? (
                                  <Eye className="h-3 w-3" />
                                ) : (
                                  <EyeOff className="h-3 w-3" />
                                )}
                                {project.isPublished ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/admin/projects/${project.id}/edit`}
                                  className="rounded p-2 text-neutral-400 transition-colors hover:bg-brand-500/10 hover:text-brand-500"
                                >
                                  <Edit className="h-4 w-4" />
                                </Link>
                                {/* Future client-side delete button */}
                                <button
                                  className="cursor-not-allowed rounded p-2 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
                                  title="Delete coming soon"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
