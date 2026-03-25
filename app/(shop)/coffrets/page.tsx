import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBundles } from "@/lib/queries/bundles"

export const metadata = {
  title: "Coffrets Cadeaux | Cadeau Chrono",
  description:
    "Découvrez nos coffrets cadeaux soigneusement composés pour chaque occasion.",
}

export default async function CoffretsPage() {
  const bundles = await getBundles()

  if (bundles.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <span className="text-6xl">📦</span>
        <h1 className="mt-4 text-2xl font-bold">Coffrets bientôt disponibles</h1>
        <p className="mt-2 text-muted-foreground">
          Nos coffrets cadeaux sont en préparation. Revenez bientôt !
        </p>
        <Button className="mt-6" render={<Link href="/" />}>
          Retour à l&apos;accueil
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Coffrets Cadeaux 📦</h1>
        <p className="mt-2 text-muted-foreground">
          Des assortiments pensés pour faire plaisir à coup sûr
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bundles.map((bundle) => {
          const savings = Number(bundle.regularPrice) - Number(bundle.bundlePrice)
          const savingsPercent = Math.round(
            (savings / Number(bundle.regularPrice)) * 100
          )

          return (
            <Link
              key={bundle.id}
              href={`/coffret/${bundle.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                {bundle.image ? (
                  <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl">
                    📦
                  </div>
                )}
                {savingsPercent > 0 && (
                  <Badge className="absolute left-2 top-2 bg-green-600 text-white">
                    Économisez {savingsPercent}%
                  </Badge>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="text-lg font-bold group-hover:text-primary">
                  {bundle.name}
                </h2>
                {bundle.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {bundle.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {bundle.bundleProducts.length} produit
                  {bundle.bundleProducts.length > 1 ? "s" : ""} inclus
                </p>
                <div className="mt-auto flex items-baseline gap-2 pt-2">
                  <span className="text-xl font-bold">
                    {Number(bundle.bundlePrice).toLocaleString("fr-CD")} CDF
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {Number(bundle.regularPrice).toLocaleString("fr-CD")} CDF
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
