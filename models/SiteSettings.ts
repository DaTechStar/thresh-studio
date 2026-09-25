import mongoose, { Schema, Document, Model } from "mongoose"

export interface ISiteSettings extends Document {
  heroVideoUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  vimeoUrl?: string
  trustedBrands?: unknown[]
  createdAt: Date
  updatedAt: Date
}

const SiteSettingsSchema: Schema = new Schema(
  {
    heroVideoUrl: { type: String },
    instagramUrl: { type: String },
    twitterUrl: { type: String },
    linkedinUrl: { type: String },
    vimeoUrl: { type: String },
    trustedBrands: [{ type: Schema.Types.Mixed }],
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

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema)
