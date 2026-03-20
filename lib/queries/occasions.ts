import { eq, asc } from "drizzle-orm"
import { db } from "@/lib/db"
import { occasion, productOccasion } from "@/lib/schema"

export async function getOccasions() {
  return db.query.occasion.findMany({
    where: eq(occasion.isActive, true),
    orderBy: [asc(occasion.sortOrder)],
  })
}

export async function getOccasionBySlug(slug: string) {
  return db.query.occasion.findFirst({
    where: eq(occasion.slug, slug),
  })
}

export async function getProductsByOccasion(occasionId: string) {
  const results = await db.query.productOccasion.findMany({
    where: eq(productOccasion.occasionId, occasionId),
    with: {
      product: {
        with: {
          images: true,
        },
      },
    },
  })

  return results.map((r) => r.product).filter((p) => p.isActive)
}
