import { Suspense } from "react"
import { getProducts } from "@/lib/queries/products"
import { getOccasions } from "@/lib/queries/occasions"
import { getCategories } from "@/lib/queries/categories"
import { ProductGrid } from "@/components/product/product-grid"
import { ProductFilters } from "./product-filters"

export const metadata = {
  title: "Tous les produits | KDOBOX",
  description:
    "Parcourez notre catalogue de cadeaux pour chaque occasion. Filtrez par prix, genre, occasion et catégorie.",
}

type Props = {
  searchParams: Promise<{
    genre?: string
    occasion?: string
    categorie?: string
    minPrice?: string
    maxPrice?: string
    tri?: string
    page?: string
  }>
}

export default async function ProduitsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = 12
  const offset = (page - 1) * limit

  const [products, occasions, categories] = await Promise.all([
    getProducts({
      limit,
      offset,
      gender: params.genre || undefined,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    }),
    getOccasions(),
    getCategories(),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">Tous les produits</h1>
        <p className="mt-1 text-muted-foreground">
          {products.length} résultat{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Suspense>
          <ProductFilters occasions={occasions} categories={categories} />
        </Suspense>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
