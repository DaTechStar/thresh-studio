import React from "react"
import Link from "next/link"
import { FileQuestion, Plus } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30 p-12 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
        <FileQuestion className="h-8 w-8 text-neutral-400" />
      </div>

      <h3 className="mb-2 text-xl font-bold text-neutral-100">{title}</h3>
      <p className="mb-8 max-w-md text-sm text-neutral-400">{description}</p>

      {action && action.href ? (
        <Link
          href={action.href}
          className="flex items-center gap-2 rounded-lg bg-brand-200 px-6 py-3 text-sm font-bold tracking-widest text-neutral-950 uppercase transition-colors hover:bg-brand-100"
        >
          <Plus className="h-4 w-4" />
          {action.label}
        </Link>
      ) : action && action.onClick ? (
        <button
          onClick={action.onClick}
          className="flex items-center gap-2 rounded-lg bg-brand-200 px-6 py-3 text-sm font-bold tracking-widest text-neutral-950 uppercase transition-colors hover:bg-brand-100"
        >
          <Plus className="h-4 w-4" />
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
