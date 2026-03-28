import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { AddToWishlistButton } from "@/app/(shop)/produit/[slug]/add-to-wishlist-button"

type ProductCardProps = {
  id: string
  name: string
  slug: string
  price: string
  compareAtPrice?: string | null
  image?: string | null
  imageAlt?: string | null
  isFeatured?: boolean
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAtPrice,
  image,
  imageAlt,
  isFeatured,
}: ProductCardProps) {
  const hasDiscount = compareAtPrice && Number(compareAtPrice) > Number(price)
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(compareAtPrice) - Number(price)) / Number(compareAtPrice)) *
          100
      )
    : 0

  return (
    <Link
      href={`/produit/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={imageAlt || name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-muted-foreground">
            🎁
          </div>
        )}
        {hasDiscount && (
          <Badge className="text-destructive-foreground absolute top-2 left-2 bg-destructive">
            -{discountPercent}%
          </Badge>
        )}
        {isFeatured && !hasDiscount && (
          <Badge className="absolute top-2 left-2">Populaire</Badge>
        )}
        <div className="absolute top-2 right-2">
          <AddToWishlistButton productId={id} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm leading-snug font-medium">
          {name}
        </h3>
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-base font-bold">
            {Number(price).toLocaleString("fr-CD")} CDF
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {Number(compareAtPrice).toLocaleString("fr-CD")} CDF
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
