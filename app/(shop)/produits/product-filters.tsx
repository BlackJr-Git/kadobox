"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type Occasion = { id: string; name: string; slug: string; icon: string | null }
type Category = { id: string; name: string; slug: string }

const GENDERS = [
  { value: "homme", label: "Pour lui 👨" },
  { value: "femme", label: "Pour elle 👩" },
  { value: "enfant", label: "Pour enfant 👶" },
  { value: "unisexe", label: "Unisexe 🎁" },
]

const BUDGETS = [
  { label: "< 5 000 CDF", min: 0, max: 5000 },
  { label: "5 000 – 15 000", min: 5000, max: 15000 },
  { label: "15 000 – 50 000", min: 15000, max: 50000 },
  { label: "> 50 000 CDF", min: 50000, max: undefined },
]

const SORTS = [
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
]

export function ProductFilters({
  occasions,
  categories,
}: {
  occasions: Occasion[]
  categories: Category[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentGender = searchParams.get("genre")
  const currentMinPrice = searchParams.get("minPrice")
  const currentMaxPrice = searchParams.get("maxPrice")
  const currentSort = searchParams.get("tri") || "newest"

  const setFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")
      router.push(`/produits?${params.toString()}`)
    },
    [router, searchParams]
  )

  const setBudget = useCallback(
    (min: number, max: number | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("minPrice", String(min))
      if (max) {
        params.set("maxPrice", String(max))
      } else {
        params.delete("maxPrice")
      }
      params.delete("page")
      router.push(`/produits?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = useCallback(() => {
    router.push("/produits")
  }, [router])

  const hasFilters =
    currentGender || currentMinPrice || currentMaxPrice || currentSort !== "newest"

  return (
    <aside className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">Trier par</h3>
        <div className="flex flex-col gap-1">
          {SORTS.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter("tri", s.value === "newest" ? null : s.value)}
              className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                currentSort === s.value
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Gender */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">Genre</h3>
        <div className="flex flex-col gap-1">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              onClick={() =>
                setFilter("genre", currentGender === g.value ? null : g.value)
              }
              className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                currentGender === g.value
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Budget */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">Budget</h3>
        <div className="flex flex-col gap-1">
          {BUDGETS.map((b) => {
            const isActive =
              currentMinPrice === String(b.min) &&
              (b.max ? currentMaxPrice === String(b.max) : !currentMaxPrice)
            return (
              <button
                key={b.label}
                onClick={() =>
                  isActive
                    ? (() => {
                        const params = new URLSearchParams(searchParams.toString())
                        params.delete("minPrice")
                        params.delete("maxPrice")
                        params.delete("page")
                        router.push(`/produits?${params.toString()}`)
                      })()
                    : setBudget(b.min, b.max)
                }
                className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {b.label}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Occasions */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">Occasion</h3>
        <div className="flex flex-col gap-1">
          {occasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => setFilter("occasion", occ.slug)}
              className="rounded-md px-3 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted"
            >
              {occ.icon} {occ.name}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h3 className="mb-2 text-sm font-semibold">Catégorie</h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter("categorie", cat.slug)}
              className="rounded-md px-3 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasFilters && (
        <>
          <Separator />
          <Button variant="outline" className="w-full" onClick={clearAll}>
            Réinitialiser les filtres
          </Button>
        </>
      )}
    </aside>
  )
}
