"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home01Icon,
  ShoppingBag03Icon,
  UserIcon,
  GiftIcon,
  FavouriteIcon,
  Menu01Icon,
  Cancel01Icon,
  Logout03Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

interface ClientNavProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

const navItems = [
  {
    href: "/client",
    label: "Accueil",
    icon: Home01Icon,
  },
  {
    href: "/client/commandes",
    label: "Commandes",
    icon: ShoppingBag03Icon,
  },
  {
    href: "/client/liste-souhaits",
    label: "Souhaits",
    icon: FavouriteIcon,
  },
  {
    href: "/client/cartes-cadeaux",
    label: "Cartes cadeaux",
    icon: GiftIcon,
  },
  {
    href: "/client/profil",
    label: "Profil",
    icon: UserIcon,
  },
]

export function ClientNav({ user }: ClientNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/")
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-card md:flex md:flex-col">
        <div className="border-b p-6">
          <Link href="/" className="block">
            <h2 className="text-xl font-bold tracking-tight">
              <span className="text-primary">KDOB</span>OX
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Espace client</p>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <HugeiconsIcon icon={item.icon} className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t p-4">
          <div className="mb-3 rounded-lg bg-muted/50 p-3">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground"
            onClick={handleSignOut}
          >
            <HugeiconsIcon icon={Logout03Icon} className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="font-bold tracking-tight">
            <span className="text-primary">KDOB</span>OX
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <HugeiconsIcon
              icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
              className="h-6 w-6"
            />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t bg-card">
            <nav className="space-y-1 p-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground active:bg-muted"
                    )}
                  >
                    <HugeiconsIcon icon={item.icon} className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t p-4">
              <div className="mb-3 rounded-lg bg-muted/50 p-3">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground"
                onClick={handleSignOut}
              >
                <HugeiconsIcon icon={Logout03Icon} className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 md:hidden">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-all",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground active:bg-muted"
                )}
              >
                <HugeiconsIcon icon={item.icon} className="h-5 w-5" />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
