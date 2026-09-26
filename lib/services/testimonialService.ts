import dbConnect from "@/lib/db"
import { Testimonial } from "@/models/Testimonial"
import { TestimonialFormValues } from "@/lib/schemas"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeDoc(doc: any) {
  if (!doc) return null
  const serialized = JSON.parse(JSON.stringify(doc))
  serialized.id = serialized._id || serialized.id
  delete serialized._id
  delete serialized.__v
  return serialized
}

export async function getTestimonials(options: { activeOnly?: boolean } = {}) {
  await dbConnect()
  const query = options.activeOnly ? { isActive: true } : {}
  const testimonials = await Testimonial.find(query)
    .sort({ order: 1, createdAt: -1 })
    .lean()
  return testimonials.map(serializeDoc)
}

export async function getTestimonialById(id: string) {
  await dbConnect()
  const testimonial = await Testimonial.findById(id).lean()
  return serializeDoc(testimonial)
}

export async function createTestimonial(data: TestimonialFormValues) {
  await dbConnect()
  const testimonial = new Testimonial(data)
  await testimonial.save()
  return serializeDoc(testimonial.toJSON())
}

export async function updateTestimonial(
  id: string,
  data: Partial<TestimonialFormValues>
) {
  await dbConnect()
  const testimonial = await Testimonial.findByIdAndUpdate(id, data, {
    new: true,
  }).lean()
  return serializeDoc(testimonial)
}

export async function deleteTestimonial(id: string) {
  await dbConnect()
  await Testimonial.findByIdAndDelete(id)
  return { success: true }
}
