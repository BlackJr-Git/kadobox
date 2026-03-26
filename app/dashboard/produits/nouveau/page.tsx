import { db } from "@/lib/db"
import { ProductForm } from "@/components/product-form"
import { serializeData } from "@/lib/serialize"

export default async function NewProductPage() {
  const [categories, occasions] = serializeData(
    await Promise.all([
      db.query.category.findMany({ orderBy: (c, { asc }) => [asc(c.name)] }),
      db.query.occasion.findMany({
        orderBy: (o, { asc }) => [asc(o.sortOrder)],
      }),
    ])
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nouveau produit</h1>
        <p className="text-muted-foreground">
          Ajoutez un nouveau produit à votre catalogue
        </p>
      </div>

      <ProductForm
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        occasions={occasions.map((o) => ({ id: o.id, name: o.name }))}
      />
    </div>
  )
}
