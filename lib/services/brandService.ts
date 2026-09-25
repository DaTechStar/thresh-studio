import dbConnect from "@/lib/db"
import { TrustedBrand } from "@/models/TrustedBrand"
import { serializeTrustedBrand, LeanDoc } from "@/lib/serializers"
import { TrustedBrandValues } from "@/lib/schemas"
import { ITrustedBrand } from "@/models/TrustedBrand"

export async function getTrustedBrands(options: { activeOnly?: boolean } = {}) {
  await dbConnect()

  const query = options.activeOnly ? { isActive: true } : {}
  const brands = await TrustedBrand.find(query)
    .sort({ order: 1, createdAt: -1 })
    .lean()

  return brands.map((b) => serializeTrustedBrand(b as LeanDoc<ITrustedBrand>))
}

export async function createTrustedBrand(data: TrustedBrandValues) {
  await dbConnect()
  const brand = new TrustedBrand(data)
  await brand.save()
  return serializeTrustedBrand(brand.toJSON() as LeanDoc<ITrustedBrand>)
}

export async function updateTrustedBrand(
  id: string,
  data: Partial<TrustedBrandValues>
) {
  await dbConnect()
  const brand = await TrustedBrand.findByIdAndUpdate(id, data, {
    new: true,
  }).lean()
  return serializeTrustedBrand(brand as LeanDoc<ITrustedBrand>)
}

export async function deleteTrustedBrand(id: string) {
  await dbConnect()
  await TrustedBrand.findByIdAndDelete(id)
  return { success: true }
}
