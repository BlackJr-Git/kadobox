import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product/product-grid"
import { getProducts } from "@/lib/queries/products"
import { getOccasionBySlug, getOccasions } from "@/lib/queries/occasions"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  const occasions = await getOccasions()
  const genders = ["homme", "femme", "enfant"]
  return occasions.flatMap((occ) =>
    genders.map((genre) => ({ occasion: occ.slug, genre }))
  )
}

type Props = {
  params: Promise<{ occasion: string; genre: string }>
}

const GENRE_LABELS: Record<string, string> = {
  homme: "Pour lui",
  femme: "Pour elle",
  enfant: "Pour enfant",
  unisexe: "Pour tous",
}

export async function generateMetadata({ params }: Props) {
  const { occasion, genre } = await params
  const occ = await getOccasionBySlug(occasion)

  const genreLabel = GENRE_LABELS[genre] || genre
  const occasionName = occ?.name || occasion

  return {
    title: `Cadeau ${occasionName} ${genreLabel} | KDOBOX`,
    description: `Idées cadeaux ${occasionName} ${genreLabel.toLowerCase()}. Trouvez le cadeau parfait sur KDOBOX avec livraison rapide en RDC.`,
  }
}

export default async function CadeauLandingPage({ params }: Props) {
  const { occasion, genre } = await params

  const validGenders = ["homme", "femme", "enfant", "unisexe"]
  if (!validGenders.includes(genre)) notFound()

  const occ = await getOccasionBySlug(occasion)
  const genreLabel = GENRE_LABELS[genre] || genre

  const products = await getProducts({
    gender: genre as "homme" | "femme" | "enfant" | "unisexe",
    limit: 24,
  })

  return (
    <>
      <section className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
            <span>/</span>
            {occ && (
              <>
                <Link
                  href={`/occasion/${occ.slug}`}
                  className="hover:text-foreground"
                >
                  {occ.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{genreLabel}</span>
          </nav>
          <h1 className="text-3xl font-bold md:text-4xl">
            {occ ? `Cadeaux ${occ.name}` : `Cadeaux ${occasion}`} — {genreLabel}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Découvrez notre sélection de cadeaux{" "}
            {occ?.name?.toLowerCase() || occasion} pour{" "}
            {genreLabel.toLowerCase()}. Livraison rapide en RDC.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="py-16 text-center">
            <span className="text-5xl">🔍</span>
            <h2 className="mt-4 text-lg font-bold">
              Aucun produit trouvé pour ces critères
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Essayez une autre combinaison ou explorez notre catalogue.
            </p>
            <Button className="mt-4" render={<Link href="/produits" />}>
              Voir tous les produits
            </Button>
          </div>
        )}
      </section>
    </>
  )
}
