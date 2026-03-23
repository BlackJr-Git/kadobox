"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/stores/cart-store"

export function CartSummary() {
  const totalPrice = useCartStore((s) => s.totalPrice())
  const totalItems = useCartStore((s) => s.totalItems())

  if (totalItems === 0) return null

  return (
    <div className="rounded-lg border p-5">
      <h3 className="font-bold">Résumé de la commande</h3>
      <Separator className="my-3" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Sous-total ({totalItems} article{totalItems !== 1 ? "s" : ""})
          </span>
          <span>{totalPrice.toLocaleString("fr-CD")} CDF</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Livraison</span>
          <span className="text-green-600">Gratuite</span>
        </div>
      </div>

      <Separator className="my-3" />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{totalPrice.toLocaleString("fr-CD")} CDF</span>
      </div>

      <Button className="mt-4 w-full" size="lg" render={<Link href="/checkout" />}>
        Commander
      </Button>

      <Button
        variant="outline"
        className="mt-2 w-full"
        render={<Link href="/personnalisation" />}
      >
        Personnaliser le cadeau
      </Button>
    </div>
  )
}
