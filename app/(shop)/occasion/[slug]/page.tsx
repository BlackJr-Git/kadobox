import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product/product-grid"
import {
  getOccasionBySlug,
  getProductsByOccasion,
  getOccasions,
} from "@/lib/queries/occasions"
import { db } from "@/lib/db"
import { occasion as occasionTable } from "@/lib/schema"
import { eq } from "drizzle-orm"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const occasions = await db.query.occasion.findMany({
    where: eq(occasionTable.isActive, true),
    columns: { slug: true },
  })
  return occasions.map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const occasion = await getOccasionBySlug(slug)
  if (!occasion) return { title: "Occasion introuvable" }

  return {
    title: `Cadeaux ${occasion.name} | KDOBOX`,
    description: `Découvre les meilleurs cadeaux pour ${occasion.name}. Livraison rapide et personnalisation offerte.`,
  }
}

export default async function OccasionPage({ params }: Props) {
  const { slug } = await params
  const occasion = await getOccasionBySlug(slug)

  if (!occasion) notFound()

  const [products, allOccasions] = await Promise.all([
    getProductsByOccasion(occasion.id),
    getOccasions(),
  ])

  const otherOccasions = allOccasions.filter((o) => o.id !== occasion.id)

  return (
    <>
      {/* Header */}
      <section
        className="border-b py-12"
        style={{
          backgroundColor: occasion.color ? `${occasion.color}10` : undefined,
        }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{occasion.icon || "🎁"}</span>
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                Cadeaux {occasion.name}
              </h1>
              {occasion.description && (
                <p className="mt-1 text-muted-foreground">
                  {occasion.description}
                </p>
              )}
              <p className="mt-1 text-sm text-muted-foreground">
                {products.length} produit{products.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <ProductGrid products={products} />
      </section>

      {/* Other occasions */}
      {otherOccasions.length > 0 && (
        <section className="border-t bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-xl font-bold">Autres occasions</h2>
            <div className="flex flex-wrap gap-2">
              {otherOccasions.map((occ) => (
                <Button
                  key={occ.id}
                  variant="outline"
                  render={<Link href={`/occasion/${occ.slug}`} />}
                >
                  {occ.icon} {occ.name}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
