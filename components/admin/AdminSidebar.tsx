import React from "react"
import { auth } from "@/auth"
import { AdminSidebarClient } from "./AdminSidebarClient"

export async function AdminSidebar() {
  const session = await auth()

  return <AdminSidebarClient email={session?.user?.email} />
}
