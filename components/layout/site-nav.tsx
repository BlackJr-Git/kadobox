"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingBag02Icon,
  UserIcon,
  SearchIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons"
import { useState } from "react"

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-primary">KDOB</span>OX
          </Link>

          <nav className="hidden items-center gap-5 text-sm md:flex">
            <Link
              href="/produits"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Produits
            </Link>
            <Link
              href="/occasion/anniversaire"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Occasions
            </Link>
            <Link
              href="/coffrets"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Coffrets
            </Link>
            <Link
              href="/cartes-cadeaux"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Cartes cadeaux
            </Link>
            <Link
              href="/recommandation"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Quiz
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <HugeiconsIcon
              icon={SearchIcon}
              strokeWidth={2}
              className="size-5"
            />
          </Button>

          <Button variant="ghost" size="icon" render={<Link href="/login" />}>
            <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            render={<Link href="/panier" />}
          >
            <HugeiconsIcon
              icon={ShoppingBag02Icon}
              strokeWidth={2}
              className="size-5"
            />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <HugeiconsIcon
              icon={Menu01Icon}
              strokeWidth={2}
              className="size-5"
            />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="/produits"
              className="rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              Produits
            </Link>
            <Link
              href="/occasion/anniversaire"
              className="rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              Occasions
            </Link>
            <Link
              href="/coffrets"
              className="rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              Coffrets
            </Link>
            <Link
              href="/cartes-cadeaux"
              className="rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              Cartes cadeaux
            </Link>
            <Link
              href="/recommandation"
              className="rounded-md px-3 py-2 hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              Quiz cadeau
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
