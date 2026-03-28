"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { createPortal } from "react-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon, Cancel01Icon } from "@hugeicons/core-free-icons"

type SearchResult = {
  id: string
  name: string
  slug: string
  price: string
  images: { url: string; alt: string | null }[]
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>(undefined)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery("")
      setResults([])
    }
  }, [open])

  const search = useCallback(async (term: string) => {
    if (term.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.products || [])
      }
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(value), 300)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
      >
        <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-4" />
        <span>Rechercher...</span>
        <kbd className="rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>
    )
  }

  const dialogContent = (
    <div className="fixed inset-0 z-9999">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-lg px-4">
        <div
          className="overflow-hidden rounded-xl border bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center border-b px-4">
            <HugeiconsIcon
              icon={SearchIcon}
              strokeWidth={2}
              className="size-5 shrink-0 text-muted-foreground"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Rechercher un cadeau..."
              className="h-12 w-full bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("")
                  setResults([])
                  inputRef.current?.focus()
                }}
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  strokeWidth={2}
                  className="size-4 text-muted-foreground"
                />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {loading && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                Recherche en cours...
              </div>
            )}

            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                Aucun résultat pour &ldquo;{query}&rdquo;
              </div>
            )}

            {!loading && results.length > 0 && (
              <ul className="p-2">
                {results.map((product) => {
                  const img = product.images?.[0]
                  return (
                    <li key={product.id}>
                      <Link
                        href={`/produit/${product.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
                      >
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                          {img ? (
                            <Image
                              src={img.url}
                              alt={img.alt || product.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm">
                              🎁
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Number(product.price).toLocaleString("fr-CD")} CDF
                          </p>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}

            {!loading && query.length < 2 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                Tapez au moins 2 caractères pour rechercher
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return mounted ? createPortal(dialogContent, document.body) : null
}
