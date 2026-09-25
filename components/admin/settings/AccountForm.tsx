"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Loader2,
  Mail,
  Lock,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react"
import { accountSettingsSchema, AccountSettingsValues } from "@/lib/schemas"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function AccountForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form = useForm<AccountSettingsValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      email: "", // Ideally we prefill this with session.user.email
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: AccountSettingsValues) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to update account")
      }

      toast.success("Account updated successfully")
      form.reset({
        ...data,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-3xl space-y-10"
    >
      <div className="border-b border-neutral-800/50 pb-6">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Account Settings
        </h3>
        <p className="max-w-xl text-[15px] text-neutral-400">
          Update your login credentials and securely manage your account
          preferences.
        </p>
      </div>

      <div className="space-y-8">
        <Field className="group max-w-xl space-y-2.5">
          <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
            Email Address
          </FieldLabel>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Mail className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
            </div>
            <Input
              placeholder="admin@threshstudio.com"
              className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
              {...form.register("email")}
            />
          </div>
          <FieldError
            errors={[
              form.formState.errors.email as unknown as { message?: string },
            ]}
          />
        </Field>

        <div className="border-t border-neutral-800/50 pt-8">
          <h4 className="mb-6 text-lg font-bold tracking-wide text-neutral-100">
            Change Password
          </h4>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {/* Current Password - Full Width */}
            <Field className="group max-w-xl space-y-2.5 md:col-span-2">
              <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
                Current Password
              </FieldLabel>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
                </div>
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pr-12 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
                  {...form.register("currentPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-300"
                >
                  {showCurrent ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
              <FieldError
                errors={[
                  form.formState.errors.currentPassword as unknown as {
                    message?: string
                  },
                ]}
              />
            </Field>

            {/* New Password */}
            <Field className="group space-y-2.5">
              <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
                New Password{" "}
                <span className="ml-1 tracking-normal text-neutral-600 normal-case">
                  (Optional)
                </span>
              </FieldLabel>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Key className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
                </div>
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="Leave blank to keep current"
                  className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pr-12 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
                  {...form.register("newPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-300"
                >
                  {showNew ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
              <FieldError
                errors={[
                  form.formState.errors.newPassword as unknown as {
                    message?: string
                  },
                ]}
              />
            </Field>

            {/* Confirm New Password */}
            <Field className="group space-y-2.5">
              <FieldLabel className="ml-1 text-xs font-bold tracking-widest text-neutral-400 uppercase transition-colors group-focus-within:text-brand-200">
                Confirm New Password
              </FieldLabel>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <ShieldCheck className="h-5 w-5 text-neutral-500 transition-colors group-focus-within:text-brand-200" />
                </div>
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl border-neutral-800/60 bg-neutral-900/40 pr-12 pl-12 text-white shadow-inner transition-all placeholder:text-neutral-600 focus:border-brand-500/40 focus:bg-neutral-900/80 focus:ring-1 focus:ring-brand-500/40"
                  {...form.register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-300"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
              <FieldError
                errors={[
                  form.formState.errors.confirmPassword as unknown as {
                    message?: string
                  },
                ]}
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="flex border-t border-neutral-800/50 pt-8 md:justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-200 px-8 py-3.5 text-[13px] font-bold tracking-widest text-neutral-950 uppercase shadow-[0_0_20px_rgba(45,212,191,0.15)] transition-all hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
          <span className="relative z-10 flex items-center gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Account Details
          </span>
        </button>
      </div>
    </form>
  )
}
