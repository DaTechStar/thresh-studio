import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { AdminUser } from "@/models/AdminUser"
import dbConnect from "@/lib/db"
import bcrypt from "bcryptjs"

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    const { email, currentPassword, newPassword } = body

    await dbConnect()
    const user = await AdminUser.findOne({ email: session.user.email })

    if (!user || !user.password) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 400 }
      )
    }

    // Update email
    user.email = email

    // Update password if provided
    if (newPassword && newPassword.trim() !== "") {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)
    }

    await user.save()

    return NextResponse.json({ success: true, email: user.email })
  } catch (error) {
    console.error("[PATCH /api/admin/account]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
