import React from "react"
import { auth } from "@/auth"
import { AdminNavClient } from "./AdminNavClient"

export async function AdminNav() {
  const session = await auth()

  return <AdminNavClient email={session?.user?.email} />
}
