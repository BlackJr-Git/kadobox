import { eq, asc } from "drizzle-orm"
import { db } from "@/lib/db"
import { occasion, productOccasion } from "@/lib/schema"
import { serializeData } from "@/lib/serialize"

export async function getOccasions() {
  const result = await db.query.occasion.findMany({
    where: eq(occasion.isActive, true),
    orderBy: [asc(occasion.sortOrder)],
  })
  return serializeData(result)
}

export async function getOccasionBySlug(slug: string) {
  const result = await db.query.occasion.findFirst({
    where: eq(occasion.slug, slug),
  })
  return serializeData(result)
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

  return serializeData(results.map((r) => r.product).filter((p) => p.isActive))
}
