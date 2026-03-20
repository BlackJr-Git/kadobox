"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/stores/cart-store"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Delete02Icon,
  MinusSignIcon,
  PlusSignIcon,
  ShoppingBag02Icon,
} from "@hugeicons/core-free-icons"

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const totalItems = useCartStore((s) => s.totalItems())

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <HugeiconsIcon
          icon={ShoppingBag02Icon}
          strokeWidth={1.5}
          className="size-16 text-muted-foreground"
        />
        <h1 className="mt-4 text-2xl font-bold">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">
          Explorez nos cadeaux et trouvez le cadeau parfait !
        </p>
        <Button className="mt-6" render={<Link href="/" />}>
          Continuer les achats
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Panier ({totalItems} article{totalItems !== 1 ? "s" : ""})
        </h1>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Vider le panier
        </Button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-lg border p-4"
            >
              <Link
                href={`/produit/${item.slug}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-md bg-muted"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">
                    🎁
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <Link
                    href={`/produit/${item.slug}`}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => removeItem(item.productId)}
                  >
                    <HugeiconsIcon
                      icon={Delete02Icon}
                      strokeWidth={2}
                      className="size-4 text-muted-foreground"
                    />
                  </Button>
                </div>

                <span className="mt-1 text-sm font-bold">
                  {item.price.toLocaleString("fr-CD")} CDF
                </span>

                <div className="mt-auto flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    <HugeiconsIcon
                      icon={MinusSignIcon}
                      strokeWidth={2}
                      className="size-3"
                    />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    <HugeiconsIcon
                      icon={PlusSignIcon}
                      strokeWidth={2}
                      className="size-3"
                    />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-lg border p-6">
          <h2 className="text-lg font-bold">Récapitulatif</h2>
          <Separator className="my-4" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span>{totalPrice.toLocaleString("fr-CD")} CDF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-green-600">Gratuite</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>{totalPrice.toLocaleString("fr-CD")} CDF</span>
          </div>

          <Button className="mt-6 w-full" size="lg">
            Passer la commande
          </Button>

          <Button
            variant="outline"
            className="mt-2 w-full"
            size="lg"
            render={<Link href="/" />}
          >
            Continuer les achats
          </Button>
        </div>
      </div>
    </div>
  )
}
