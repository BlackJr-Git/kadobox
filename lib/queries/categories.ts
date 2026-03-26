import { eq, asc } from "drizzle-orm"
import { db } from "@/lib/db"
import { category, productCategory } from "@/lib/schema"
import { serializeData } from "@/lib/serialize"

export async function getCategories() {
  const result = await db.query.category.findMany({
    where: eq(category.isActive, true),
    orderBy: [asc(category.sortOrder)],
  })
  return serializeData(result)
}

export async function getCategoryBySlug(slug: string) {
  const result = await db.query.category.findFirst({
    where: eq(category.slug, slug),
  })
  return serializeData(result)
}

export async function getProductsByCategory(categoryId: string) {
  const results = await db.query.productCategory.findMany({
    where: eq(productCategory.categoryId, categoryId),
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
