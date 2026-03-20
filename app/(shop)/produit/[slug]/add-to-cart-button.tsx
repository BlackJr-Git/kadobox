"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { HugeiconsIcon } from "@hugeicons/react"
import { ShoppingBag02Icon } from "@hugeicons/core-free-icons"

type Props = {
  productId: string
  name: string
  price: number
  image: string | null
  slug: string
  disabled?: boolean
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  slug,
  disabled,
}: Props) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <Button
      size="lg"
      className="w-full gap-2"
      disabled={disabled}
      onClick={() =>
        addItem({
          productId,
          name,
          price,
          image,
          slug,
        })
      }
    >
      <HugeiconsIcon
        icon={ShoppingBag02Icon}
        strokeWidth={2}
        className="size-4"
      />
      {disabled ? "Indisponible" : "Ajouter au panier"}
    </Button>
  )
}
