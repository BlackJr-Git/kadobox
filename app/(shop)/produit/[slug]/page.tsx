import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProductBySlug } from "@/lib/queries/products"
import { AddToCartButton } from "./add-to-cart-button"
import Link from "next/link"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Produit introuvable" }

  return {
    title: `${product.name} | KDOBOX`,
    description: product.shortDescription || product.description?.slice(0, 160),
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const images = product.images?.sort((a, b) => a.sortOrder - b.sortOrder)
  const mainImage = images?.[0]

  const occasions = product.productOccasions?.map((po) => po.occasion)
  const categories = product.productCategories?.map((pc) => pc.category)

  const hasDiscount =
    product.compareAtPrice &&
    Number(product.compareAtPrice) > Number(product.price)
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.compareAtPrice) - Number(product.price)) /
          Number(product.compareAtPrice!)) *
          100
      )
    : 0

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">
                🎁
              </div>
            )}
            {hasDiscount && (
              <Badge className="text-destructive-foreground absolute top-3 left-3 bg-destructive">
                -{discountPercent}%
              </Badge>
            )}
          </div>
          {images && images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={img.url}
                    alt={img.alt || product.name}
                    fill
                    className="object-cover"
                    sizes="12vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {occasions?.map((occ) => (
              <Badge key={occ.id} variant="secondary">
                <Link href={`/occasion/${occ.slug}`}>
                  {occ.icon} {occ.name}
                </Link>
              </Badge>
            ))}
            {categories?.map((cat) => (
              <Badge key={cat.id} variant="outline">
                {cat.name}
              </Badge>
            ))}
          </div>

          <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>

          {/* Rating */}
          {avgRating && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-yellow-500">
                {"★".repeat(Math.round(avgRating))}
                {"☆".repeat(5 - Math.round(avgRating))}
              </span>
              <span>
                {avgRating.toFixed(1)} ({product.reviews!.length} avis)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              {Number(product.price).toLocaleString("fr-CD")} CDF
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                {Number(product.compareAtPrice).toLocaleString("fr-CD")} CDF
              </span>
            )}
          </div>

          {/* Stock */}
          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600">
                En stock ({product.stock} disponibles)
              </span>
            ) : (
              <span className="text-destructive">Rupture de stock</span>
            )}
          </p>

          <Separator className="my-5" />

          {/* Description */}
          {product.shortDescription && (
            <p className="text-muted-foreground">{product.shortDescription}</p>
          )}

          {/* Add to cart */}
          <div className="mt-6">
            <AddToCartButton
              productId={product.id}
              name={product.name}
              price={Number(product.price)}
              image={mainImage?.url || null}
              slug={product.slug}
              disabled={product.stock <= 0}
            />
          </div>

          <Separator className="my-5" />

          {/* Full description */}
          {product.description && (
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <h3 className="text-base font-semibold text-foreground">
                Description
              </h3>
              <p className="whitespace-pre-line">{product.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold">
            Avis clients ({product.reviews.length})
          </h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user.name}</span>
                    <span className="text-sm text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                {review.comment && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
