import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategories,
} from "@/lib/queries/categories"
import { db } from "@/lib/db"
import { category as categoryTable } from "@/lib/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await db.query.category.findMany({
    where: eq(categoryTable.isActive, true),
    columns: { slug: true },
  })
  return categories.map((c) => ({ slug: c.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: "Catégorie introuvable" }

  return {
    title: `${category.name} | KDOBOX`,
    description:
      category.description ||
      `Découvrez notre sélection de ${category.name} sur KDOBOX.`,
  }
}

export default async function CategoriePage({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) notFound()

  const [products, allCategories] = await Promise.all([
    getProductsByCategory(category.id),
    getCategories(),
  ])

  const otherCategories = allCategories.filter((c) => c.id !== category.id)

  return (
    <>
      <section className="border-b py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold md:text-4xl">{category.name}</h1>
          {category.description && (
            <p className="mt-2 text-muted-foreground">{category.description}</p>
          )}
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} produit{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <ProductGrid products={products} />
      </section>

      {otherCategories.length > 0 && (
        <section className="border-t bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-xl font-bold">Autres catégories</h2>
            <div className="flex flex-wrap gap-2">
              {otherCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant="outline"
                  render={<Link href={`/categorie/${cat.slug}`} />}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
