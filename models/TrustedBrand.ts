import mongoose, { Schema, Document, Model } from "mongoose"

export interface ITrustedBrand extends Document {
  name: string
  logoUrl: string
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const TrustedBrandSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
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

// Indexes for fast querying
TrustedBrandSchema.index({ isActive: 1, order: 1 })

export const TrustedBrand: Model<ITrustedBrand> =
  mongoose.models.TrustedBrand ||
  mongoose.model<ITrustedBrand>("TrustedBrand", TrustedBrandSchema)
