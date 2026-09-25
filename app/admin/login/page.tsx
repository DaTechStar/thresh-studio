import React from "react"
import { LoginForm } from "@/components/admin/LoginForm"

export const metadata = {
  title: "Admin Login | Thresh Studio",
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-950 p-4">
      {/* Background glowing effects */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 shadow-lg shadow-brand-500/10">
            <svg
              className="h-8 w-8 text-brand-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
            Thresh<span className="text-brand-500">Admin</span>
          </h2>
          <p className="mt-3 font-mono text-xs tracking-widest text-neutral-400 uppercase">
            Restricted Access
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
