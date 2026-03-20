import { ProductCard } from "./product-card"

type Product = {
  id: string
  name: string
  slug: string
  price: string
  compareAtPrice?: string | null
  isFeatured: boolean
  images: { id: string; url: string; alt: string | null; sortOrder: number }[]
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-5xl">🔍</span>
        <p className="mt-4 text-lg font-medium">Aucun produit trouvé</p>
        <p className="text-sm text-muted-foreground">
          Essayez de modifier vos filtres
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        const mainImage = product.images?.sort(
          (a, b) => a.sortOrder - b.sortOrder
        )[0]

        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            image={mainImage?.url}
            imageAlt={mainImage?.alt}
            isFeatured={product.isFeatured}
          />
        )
      })}
    </div>
  )
}
