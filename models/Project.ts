import mongoose, { Schema, Document, Model } from "mongoose"

export interface IProject extends Document {
  // 1. HERO
  category: string
  year: string
  title: string
  slug: string
  tagline: string
  videoUrl: string

  // 2. STATS
  stats: { label: string; value: string }[]

  // 3. OVERVIEW
  description: string
  services: string[]
  deliverables: string[]

  // 4. CHALLENGE / APPROACH
  challenge: string
  approach: string

  // 5. GALLERY
  gallery: string[]

  // 6. OUTCOME
  outcome: string

  // METADATA
  order: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    year: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    tagline: { type: String, required: true },
    videoUrl: { type: String, required: true },

    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],

    description: { type: String, required: true },
    services: [{ type: String }],
    deliverables: [{ type: String }],

    challenge: { type: String, required: true },
    approach: { type: String, required: true },

    gallery: [{ type: String }],

    outcome: { type: String, required: true },

    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id)
        delete ret._id
        delete ret.__v
      },
    },
  }
)

ProjectSchema.index({ isPublished: 1, order: 1 })

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)
