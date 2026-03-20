import { eq, asc } from "drizzle-orm"
import { db } from "@/lib/db"
import { category, productCategory } from "@/lib/schema"

export async function getCategories() {
  return db.query.category.findMany({
    where: eq(category.isActive, true),
    orderBy: [asc(category.sortOrder)],
  })
}

export async function getCategoryBySlug(slug: string) {
  return db.query.category.findFirst({
    where: eq(category.slug, slug),
  })
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

  return results
    .map((r) => r.product)
    .filter((p) => p.isActive)
}
