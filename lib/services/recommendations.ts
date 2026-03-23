import { eq, and, desc, gte, lte, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { product, productOccasion, occasion } from "@/lib/schema"

type RecommendationParams = {
  gender?: string
  minPrice?: number
  maxPrice?: number
  occasionSlug?: string
  limit?: number
  excludeProductIds?: string[]
}

export async function getRecommendations({
  gender,
  minPrice,
  maxPrice,
  occasionSlug,
  limit = 8,
  excludeProductIds = [],
}: RecommendationParams) {
  const conditions = [eq(product.isActive, true)]

  if (gender && gender !== "unisexe") {
    conditions.push(
      eq(product.gender, gender as "homme" | "femme" | "unisexe" | "enfant")
    )
  }
  if (minPrice !== undefined) {
    conditions.push(gte(product.price, String(minPrice)))
  }
  if (maxPrice !== undefined) {
    conditions.push(lte(product.price, String(maxPrice)))
  }

  if (occasionSlug) {
    const occ = await db.query.occasion.findFirst({
      where: eq(occasion.slug, occasionSlug),
    })
    if (occ) {
      const occasionProducts = await db.query.productOccasion.findMany({
        where: eq(productOccasion.occasionId, occ.id),
        columns: { productId: true },
      })
      const occasionProductIds = occasionProducts.map((op) => op.productId)
      if (occasionProductIds.length > 0) {
        conditions.push(
          sql`${product.id} IN (${sql.join(
            occasionProductIds.map((id) => sql`${id}`),
            sql`, `
          )})`
        )
      }
    }
  }

  let products = await db.query.product.findMany({
    where: and(...conditions),
    with: { images: true },
    limit: limit + excludeProductIds.length,
    orderBy: [desc(product.isFeatured), desc(product.createdAt)],
  })

  if (excludeProductIds.length > 0) {
    products = products.filter((p) => !excludeProductIds.includes(p.id))
  }

  return products.slice(0, limit)
}

export async function getSimilarProducts(productId: string, limit = 4) {
  const currentProduct = await db.query.product.findFirst({
    where: eq(product.id, productId),
    with: {
      productOccasions: true,
      productCategories: true,
    },
  })

  if (!currentProduct) return []

  const conditions = [
    eq(product.isActive, true),
    sql`${product.id} != ${productId}`,
  ]

  if (currentProduct.gender) {
    conditions.push(eq(product.gender, currentProduct.gender))
  }

  const priceRange = Number(currentProduct.price) * 0.5
  conditions.push(
    gte(product.price, String(Number(currentProduct.price) - priceRange))
  )
  conditions.push(
    lte(product.price, String(Number(currentProduct.price) + priceRange))
  )

  return db.query.product.findMany({
    where: and(...conditions),
    with: { images: true },
    limit,
    orderBy: [desc(product.isFeatured)],
  })
}

export async function getBestSellersByOccasion(
  occasionSlug: string,
  limit = 8
) {
  const occ = await db.query.occasion.findFirst({
    where: eq(occasion.slug, occasionSlug),
  })

  if (!occ) return []

  const results = await db.query.productOccasion.findMany({
    where: eq(productOccasion.occasionId, occ.id),
    with: {
      product: {
        with: { images: true },
      },
    },
  })

  return results
    .map((r) => r.product)
    .filter((p) => p.isActive)
    .slice(0, limit)
}
