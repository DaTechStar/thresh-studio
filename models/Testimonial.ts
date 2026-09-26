import mongoose, { Schema, Document, Model } from "mongoose"

export interface ITestimonial extends Document {
  quote: string
  author: string
  role: string
  avatar: string
  rating: number
  isActive: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const TestimonialSchema: Schema = new Schema(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number, default: 5 },
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

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema)
