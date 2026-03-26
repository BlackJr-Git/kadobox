import { eq, desc, and, gte, lte } from "drizzle-orm"
import { db } from "@/lib/db"
import { product } from "@/lib/schema"
import { serializeData } from "@/lib/serialize"

export async function getFeaturedProducts() {
  const result = await db.query.product.findMany({
    where: and(eq(product.isActive, true), eq(product.isFeatured, true)),
    with: {
      images: true,
    },
    limit: 8,
  })
  return serializeData(result)
}

export async function getProductBySlug(slug: string) {
  const result = await db.query.product.findFirst({
    where: eq(product.slug, slug),
    with: {
      images: true,
      productOccasions: {
        with: { occasion: true },
      },
      productCategories: {
        with: { category: true },
      },
      reviews: {
        with: { user: true },
      },
    },
  })
  return serializeData(result)
}

export async function getProducts({
  limit = 12,
  offset = 0,
  minPrice,
  maxPrice,
  gender,
}: {
  limit?: number
  offset?: number
  minPrice?: number
  maxPrice?: number
  gender?: string
} = {}) {
  const conditions = [eq(product.isActive, true)]

  if (minPrice !== undefined) {
    conditions.push(gte(product.price, String(minPrice)))
  }
  if (maxPrice !== undefined) {
    conditions.push(lte(product.price, String(maxPrice)))
  }
  if (gender) {
    conditions.push(
      eq(product.gender, gender as "homme" | "femme" | "unisexe" | "enfant")
    )
  }

  const result = await db.query.product.findMany({
    where: and(...conditions),
    with: {
      images: true,
    },
    limit,
    offset,
    orderBy: [desc(product.createdAt)],
  })
  return serializeData(result)
}

export async function getLatestProducts(limit = 8) {
  const result = await db.query.product.findMany({
    where: eq(product.isActive, true),
    with: {
      images: true,
    },
    limit,
    orderBy: [desc(product.createdAt)],
  })
  return serializeData(result)
}
