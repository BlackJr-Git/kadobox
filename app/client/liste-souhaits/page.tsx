"use client"

import { useEffect, useState } from "react"
import { useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Share08Icon,
  Delete02Icon,
  ShoppingCart01Icon,
  Copy01Icon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type WishlistProduct = {
  id: string
  name: string
  price: string
  images: { url: string; alt: string | null }[]
  slug: string
}

type WishlistItem = {
  id: string
  product: WishlistProduct
}

type Wishlist = {
  id: string
  items: WishlistItem[]
}

export default function WishlistPage() {
  const { data: session, isPending } = useSession()
  const [wishlist, setWishlist] = useState<Wishlist | null>(null)
  const [loading, setLoading] = useState(true)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    if (!isPending && session?.user) {
      fetchWishlist()
    } else if (!isPending && !session?.user) {
      setLoading(false)
    }
  }, [session, isPending])

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist")
      if (!response.ok) throw new Error("Failed to fetch wishlist")
      const data = await response.json()
      setWishlist(data)
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors du chargement de la liste")
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) throw new Error("Failed to remove")

      toast.success("Produit retiré de la liste")
      fetchWishlist()
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const generateShareLink = async () => {
    try {
      const response = await fetch("/api/wishlist/share", {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to generate share link")

      const data = await response.json()
      const url = `${window.location.origin}/liste-souhaits/${data.shareId}`
      setShareUrl(url)
      setShareDialogOpen(true)
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de la génération du lien")
    }
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast.success("Lien copié dans le presse-papier")
  }

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Ma liste de souhaits</h1>
          <p className="mb-8 text-muted-foreground">
            Connectez-vous pour voir votre liste de souhaits
          </p>
          <Button render={<Link href="/login" />}>Se connecter</Button>
        </div>
      </div>
    )
  }

  const items = wishlist?.items || []

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Ma liste de souhaits
          </h1>
          <p className="mt-2 text-muted-foreground">
            {items.length} produit{items.length > 1 ? "s" : ""} dans votre liste
          </p>
        </div>

        {items.length > 0 && (
          <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
            <DialogTrigger
              render={
                <Button onClick={generateShareLink} variant="outline" size="lg">
                  <HugeiconsIcon
                    icon={Share08Icon}
                    className="mr-2 h-5 w-5"
                    strokeWidth={2}
                  />
                  Partager
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Partager ma liste de souhaits</DialogTitle>
                <DialogDescription>
                  Partagez ce lien avec vos proches pour qu&apos;ils puissent
                  voir vos envies
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input value={shareUrl} readOnly className="flex-1" />
                  <Button onClick={copyShareLink} variant="outline" size="icon">
                    <HugeiconsIcon
                      icon={Copy01Icon}
                      className="h-4 w-4"
                      strokeWidth={2}
                    />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ce lien est public et peut être partagé avec n&apos;importe
                  qui
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <div className="mx-auto mb-6 w-fit rounded-full bg-rose-500/10 p-6">
            <HugeiconsIcon
              icon={FavouriteIcon}
              className="h-12 w-12 text-rose-600"
              strokeWidth={2}
            />
          </div>
          <h2 className="mb-2 text-xl font-bold">
            Votre liste de souhaits est vide
          </h2>
          <p className="mb-6 text-muted-foreground">
            Ajoutez des produits à votre liste pour les retrouver facilement
          </p>
          <Button size="lg" render={<Link href="/produits" />}>
            Découvrir nos produits
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
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
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>

              <div className="p-5">
                <Link href={`/produit/${item.product.slug}`}>
                  <h3 className="mb-2 line-clamp-2 font-semibold transition-colors hover:text-primary">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="mb-4 text-xl font-bold">
                  {Number(item.product.price).toLocaleString("fr-CD")} CDF
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    render={<Link href={`/produit/${item.product.slug}`} />}
                  >
                    <HugeiconsIcon
                      icon={ShoppingCart01Icon}
                      className="mr-2 h-4 w-4"
                      strokeWidth={2}
                    />
                    Voir
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.product.id)}
                    className="shrink-0"
                  >
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      className="h-4 w-4"
                      strokeWidth={2}
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
