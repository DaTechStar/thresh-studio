import React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"

interface FetchErrorProps {
  onRetry?: () => void
  message?: string
}

export function FetchError({
  onRetry,
  message = "Failed to load data.",
}: FetchErrorProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 text-center">
      <AlertCircle className="mb-4 h-10 w-10 text-neutral-400" />
      <h3 className="text-lg font-medium text-neutral-200">
        Something went wrong
      </h3>
      <p className="mt-2 mb-6 max-w-sm text-sm text-neutral-400">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  )
}
