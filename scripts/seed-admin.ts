import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { config } from "dotenv"

// Load environment variables from .env.local
config({ path: ".env.local" })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local")
  process.exit(1)
}

// Define inline schema to avoid module alias (@/) issues in standalone scripts
const AdminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: "admin", enum: ["admin", "superadmin"] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const AdminUser =
  mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema)

async function seedAdmin() {
  try {
    console.log("⏳ Connecting to MongoDB...")
    await mongoose.connect(MONGODB_URI as string)
    console.log("✅ Connected.")

    const email = "admin@threshstudio.com"
    const plainPassword = "admin"

    // Check if admin already exists
    const existing = await AdminUser.findOne({ email })
    if (existing) {
      console.log(`⚠️ Admin user '${email}' already exists.`)
      process.exit(0)
    }

    console.log("⏳ Hashing password...")
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(plainPassword, salt)

    console.log(`⏳ Creating admin user '${email}'...`)
    const admin = new AdminUser({
      email,
      password: hashedPassword,
      name: "Thresh Admin",
      role: "superadmin",
    })

    await admin.save()
    console.log("✅ Admin user seeded successfully!")
    console.log("-----------------------------------------")
    console.log(`Email:    ${email}`)
    console.log(`Password: ${plainPassword}`)
    console.log("-----------------------------------------")
    console.log("⚠️ Please change the password immediately after logging in.")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding admin:", error)
    process.exit(1)
  }
}

seedAdmin()
