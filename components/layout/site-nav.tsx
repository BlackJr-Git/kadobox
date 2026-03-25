"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/stores/cart-store"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingBag02Icon,
  UserIcon,
  Menu01Icon,
  User03Icon,
  ShoppingCart01Icon,
  Settings01Icon,
  Logout01Icon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons"
import { useState } from "react"
import { SearchDialog } from "@/components/layout/search-dialog"
import Logo from "../logo"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "@/lib/auth-client"
import { usePathname } from "next/navigation"

// Composant pour l'utilisateur connecté
function NavUser({
  user,
}: {
  user: { name: string; email: string; image?: string | null; role?: string }
}) {
  const handleLogout = async () => {
    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/client" />}>
            <HugeiconsIcon
              icon={User03Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Mon compte
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/client/commandes" />}>
            <HugeiconsIcon
              icon={ShoppingCart01Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Mes commandes
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/client/profil" />}>
            <HugeiconsIcon
              icon={Settings01Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Paramètres
          </DropdownMenuItem>
          {/* Lien Dashboard uniquement pour les admins */}
          {user.role === "admin" && (
            <DropdownMenuItem render={<Link href="/dashboard" />}>
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                strokeWidth={2}
                className="mr-2 size-4"
              />
              Dashboard Admin
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <HugeiconsIcon
              icon={Logout01Icon}
              strokeWidth={2}
              className="mr-2 size-4"
            />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())
  const { data: session, isPending } = useSession()
  const user = session?.user
  const pathname = usePathname()

  // Fonction pour stocker l'URL de redirection avant de rediriger vers login
  const handleLoginRedirect = () => {
    // Stocker l'URL actuelle dans sessionStorage
    sessionStorage.setItem("redirectUrl", pathname)
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          {/* <Link href="/" className="text-xl font-bold tracking-tight"> */}
          {/* <span className="text-primary">KDOB</span>OX */}
          <Logo className="h-12 w-auto" />
          {/* </Link> */}

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
          <SearchDialog />

          {isPending ? (
            <Button variant="ghost" size="icon" disabled>
              <HugeiconsIcon
                icon={UserIcon}
                strokeWidth={2}
                className="size-5"
              />
            </Button>
          ) : user ? (
            <NavUser user={user} />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              render={<Link href="/login" onClick={handleLoginRedirect} />}
            >
              <HugeiconsIcon
                icon={UserIcon}
                strokeWidth={2}
                className="size-5"
              />
            </Button>
          )}

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
