"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon } from "@hugeicons/core-free-icons"

export function AddToWishlistButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    try {
      const method = added ? "DELETE" : "POST"
      const res = await fetch("/api/wishlist", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })
      if (res.status === 401) {
        // Stocker l'URL actuelle et rediriger vers login
        sessionStorage.setItem("redirectUrl", pathname)
        router.push("/login")
        return
      }
      setAdded(!added)
    } catch (error) {
      console.error("Wishlist toggle error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      disabled={loading}
      aria-label={added ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <HugeiconsIcon
        icon={FavouriteIcon}
        strokeWidth={2}
        className={`size-5 ${added ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
      />
    </Button>
  )
}
