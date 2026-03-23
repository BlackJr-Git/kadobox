"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCartStore, type CartItem as CartItemType } from "@/lib/stores/cart-store"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon, Add01Icon, MinusSignIcon } from "@hugeicons/core-free-icons"

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex gap-4">
      <Link
        href={`/produit/${item.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl">
            🎁
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/produit/${item.slug}`}
            className="truncate font-medium hover:text-primary"
          >
            {item.name}
          </Link>
          <p className="text-sm font-bold text-primary">
            {item.price.toLocaleString("fr-CD")} CDF
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
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
              size="icon"
              className="size-7"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            >
              <HugeiconsIcon
                icon={Add01Icon}
                strokeWidth={2}
                className="size-3"
              />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.productId)}
          >
            <HugeiconsIcon
              icon={Delete02Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
