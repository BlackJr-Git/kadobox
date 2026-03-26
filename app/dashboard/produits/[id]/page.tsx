import { db } from "@/lib/db"
import { product } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { ProductForm } from "@/components/product-form"
import { notFound } from "next/navigation"
import { serializeData } from "@/lib/serialize"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [rawProduct, rawCategories, rawOccasions] = await Promise.all([
    db.query.product.findFirst({
      where: eq(product.id, id),
      with: {
        images: true,
        productCategories: { with: { category: true } },
        productOccasions: { with: { occasion: true } },
      },
    }),
    db.query.category.findMany({ orderBy: (c, { asc }) => [asc(c.name)] }),
    db.query.occasion.findMany({
      orderBy: (o, { asc }) => [asc(o.sortOrder)],
    }),
  ])

  if (!rawProduct) {
    notFound()
  }

  const productData = serializeData(rawProduct)
  const categories = serializeData(rawCategories)
  const occasions = serializeData(rawOccasions)

  const formattedProduct = {
    id: productData.id,
    name: productData.name,
    description: productData.description || "",
    price: Number(productData.price),
    stock: productData.stock,
    gender: productData.gender,
    isActive: productData.isActive,
    images: productData.images.map(
      (img: { url: string; alt: string | null }) => ({
        url: img.url,
        altText: img.alt || undefined,
      })
    ),
    categoryIds: productData.productCategories.map(
      (c: { categoryId: string }) => c.categoryId
    ),
    occasionIds: productData.productOccasions.map(
      (o: { occasionId: string }) => o.occasionId
    ),
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Modifier le produit</h1>
        <p className="text-muted-foreground">
          Mettez à jour les informations du produit
        </p>
      </div>

      <ProductForm
        product={formattedProduct}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        occasions={occasions.map((o) => ({ id: o.id, name: o.name }))}
      />
    </div>
  )
}
