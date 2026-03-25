import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getBundleBySlug, getBundles } from "@/lib/queries/bundles"

export const revalidate = 3600

export async function generateStaticParams() {
  const bundles = await getBundles()
  return bundles.map((b) => ({ slug: b.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const bundle = await getBundleBySlug(slug)
  if (!bundle) return { title: "Coffret introuvable" }

  return {
    title: `${bundle.name} | Cadeau Chrono`,
    description:
      bundle.description || `Coffret cadeau ${bundle.name} sur Cadeau Chrono`,
  }
}

export default async function CoffretPage({ params }: Props) {
  const { slug } = await params
  const bundle = await getBundleBySlug(slug)

  if (!bundle) notFound()

  const savings = Number(bundle.regularPrice) - Number(bundle.bundlePrice)
  const savingsPercent = Math.round(
    (savings / Number(bundle.regularPrice)) * 100
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          {bundle.image ? (
            <Image
              src={bundle.image}
              alt={bundle.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              📦
            </div>
          )}
          {savingsPercent > 0 && (
            <Badge className="absolute top-3 left-3 bg-green-600 text-white">
              Économisez {savingsPercent}%
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold md:text-3xl">{bundle.name}</h1>
          {bundle.description && (
            <p className="mt-2 text-muted-foreground">{bundle.description}</p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              {Number(bundle.bundlePrice).toLocaleString("fr-CD")} CDF
            </span>
            <span className="text-lg text-muted-foreground line-through">
              {Number(bundle.regularPrice).toLocaleString("fr-CD")} CDF
            </span>
          </div>
          {savings > 0 && (
            <p className="mt-1 text-sm font-medium text-green-600">
              Vous économisez {savings.toLocaleString("fr-CD")} CDF
            </p>
          )}

          <Separator className="my-5" />

          <h2 className="mb-3 font-bold">
            Ce coffret contient ({bundle.bundleProducts.length} produits) :
          </h2>
          <div className="space-y-3">
            {bundle.bundleProducts.map((bp) => {
              const img = bp.product.images?.[0]
              return (
                <Link
                  key={bp.product.id}
                  href={`/produit/${bp.product.slug}`}
                  className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                    {img ? (
                      <Image
                        src={img.url}
                        alt={img.alt || bp.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xl">
                        🎁
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{bp.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {bp.quantity > 1 ? `× ${bp.quantity}` : ""}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
