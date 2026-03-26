import { db } from "@/lib/db"
import { wishlist } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ShoppingCart01Icon, FavouriteIcon } from "@hugeicons/core-free-icons"
import { serializeData } from "@/lib/serialize"

type Props = {
  params: Promise<{ shareId: string }>
}

export default async function SharedWishlistPage({ params }: Props) {
  const { shareId } = await params

  // Décoder l'ID de la wishlist depuis le shareId
  let wishlistId: string
  try {
    wishlistId = Buffer.from(shareId, "base64url").toString()
  } catch {
    notFound()
  }

  // Récupérer la wishlist
  const wishlistData = await db.query.wishlist.findFirst({
    where: eq(wishlist.id, wishlistId),
    with: {
      user: true,
      items: {
        with: {
          product: {
            with: {
              images: true,
            },
          },
        },
      },
    },
  })

  if (!wishlistData) {
    notFound()
  }

  const serializedWishlist = serializeData(wishlistData)
  const items = serializedWishlist.items || []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <HugeiconsIcon
              icon={FavouriteIcon}
              className="h-6 w-6 text-primary"
              strokeWidth={2}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              Liste de souhaits de {serializedWishlist.user.name}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {items.length} produit{items.length > 1 ? "s" : ""} dans cette
              liste
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Découvrez les envies de {serializedWishlist.user.name} et trouvez le
          cadeau parfait
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border bg-muted/30 p-12 text-center">
          <p className="text-lg text-muted-foreground">
            Cette liste de souhaits est vide pour le moment
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
            >
              <Link
                href={`/produit/${item.product.slug}`}
                className="relative block aspect-square overflow-hidden bg-muted"
              >
                {item.product.images[0] && (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                )}
              </Link>

              <div className="p-4">
                <Link href={`/produit/${item.product.slug}`}>
                  <h3 className="mb-2 line-clamp-2 font-semibold transition-colors hover:text-primary">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="mb-4 text-lg font-bold text-primary">
                  {Number(item.product.price).toLocaleString("fr-CD")} CDF
                </p>

                <Button
                  className="w-full"
                  render={<Link href={`/produit/${item.product.slug}`} />}
                >
                  <HugeiconsIcon
                    icon={ShoppingCart01Icon}
                    className="mr-2 h-4 w-4"
                    strokeWidth={2}
                  />
                  Voir le produit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 rounded-lg border bg-muted/30 p-6 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          Vous souhaitez créer votre propre liste de souhaits ?
        </p>
        <Button render={<Link href="/signup" />}>Créer mon compte</Button>
      </div>
    </div>
  )
}
