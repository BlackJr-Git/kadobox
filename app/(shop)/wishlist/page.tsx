import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getWishlistByUser } from "@/lib/queries/wishlist"
import { WishlistRemoveButton } from "./wishlist-remove-button"

export const metadata = {
  title: "Ma liste de souhaits | KDOBOX",
  description:
    "Gérez vos produits favoris et partagez votre liste de souhaits.",
}

export default async function WishlistPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold md:text-3xl">Ma liste de souhaits</h1>
        <div className="mt-12 flex flex-col items-center py-12 text-center">
          <span className="text-5xl">💝</span>
          <h2 className="mt-4 text-lg font-bold">
            Connectez-vous pour voir votre liste
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sauvegardez vos produits favoris en vous connectant.
          </p>
          <div className="mt-6 flex gap-3">
            <Button render={<Link href="/login" />}>Se connecter</Button>
            <Button variant="outline" render={<Link href="/produits" />}>
              Voir les produits
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const wishlist = await getWishlistByUser(session.user.id)
  const items = wishlist?.items ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold md:text-3xl">
        Ma liste de souhaits ({items.length})
      </h1>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center py-12 text-center">
          <span className="text-5xl">💝</span>
          <h2 className="mt-4 text-lg font-bold">Votre liste est vide</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Parcourez notre catalogue et ajoutez vos produits favoris !
          </p>
          <Button className="mt-6" render={<Link href="/produits" />}>
            Voir les produits
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const img = item.product.images?.[0]
            return (
              <div
                key={item.id}
                className="group relative rounded-lg border p-3"
              >
                <WishlistRemoveButton productId={item.productId} />
                <Link href={`/produit/${item.product.slug}`}>
                  <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                    {img ? (
                      <Image
                        src={img.url}
                        alt={img.alt || item.product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl">
                        🎁
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2 truncate font-medium">
                    {item.product.name}
                  </h3>
                  <p className="text-sm font-bold">
                    {Number(item.product.price).toLocaleString("fr-CD")} CDF
                  </p>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
