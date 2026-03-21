"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"

type Step = "who" | "budget" | "occasion" | "results"

const WHO_OPTIONS = [
  { value: "homme", label: "Pour lui", emoji: "👨" },
  { value: "femme", label: "Pour elle", emoji: "👩" },
  { value: "enfant", label: "Pour un enfant", emoji: "👶" },
  { value: "unisexe", label: "Je ne sais pas", emoji: "🤷" },
]

const BUDGET_OPTIONS = [
  { value: "low", label: "< 15 000 CDF", min: 0, max: 15000 },
  { value: "mid", label: "15 000 – 35 000 CDF", min: 15000, max: 35000 },
  { value: "high", label: "35 000 – 55 000 CDF", min: 35000, max: 55000 },
  { value: "premium", label: "> 55 000 CDF", min: 55000, max: 999999 },
]

const OCCASION_OPTIONS = [
  { value: "anniversaire", label: "Anniversaire", emoji: "🎂" },
  { value: "mariage", label: "Mariage", emoji: "💒" },
  { value: "noel", label: "Noël", emoji: "🎄" },
  { value: "saint-valentin", label: "Saint-Valentin", emoji: "💝" },
  { value: "fete-des-meres", label: "Fête des mères", emoji: "🌸" },
  { value: "fete-des-peres", label: "Fête des pères", emoji: "👔" },
  { value: "autre", label: "Autre", emoji: "🎁" },
]

type Product = {
  id: string
  name: string
  slug: string
  price: string
  compareAtPrice: string | null
  images: { url: string; alt: string | null }[]
}

export default function RecommandationPage() {
  const [step, setStep] = useState<Step>("who")
  const [who, setWho] = useState<string | null>(null)
  const [budget, setBudget] = useState<string | null>(null)
  const [occasion, setOccasion] = useState<string | null>(null)
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const handleFinish = async (selectedOccasion: string) => {
    setOccasion(selectedOccasion)
    setLoading(true)
    setStep("results")

    try {
      const budgetRange = BUDGET_OPTIONS.find((b) => b.value === budget)
      const params = new URLSearchParams()
      if (who && who !== "unisexe") params.set("gender", who)
      if (budgetRange) {
        params.set("minPrice", String(budgetRange.min))
        params.set("maxPrice", String(budgetRange.max))
      }

      const res = await fetch(`/api/products?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setResults(data.products || [])
      }
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const restart = () => {
    setStep("who")
    setWho(null)
    setBudget(null)
    setOccasion(null)
    setResults([])
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {step !== "results" && (
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Trouve le cadeau parfait</h1>
          <p className="mt-2 text-muted-foreground">
            Réponds à 3 questions, on fait le reste
          </p>
          <div className="mx-auto mt-4 flex max-w-xs gap-1">
            {["who", "budget", "occasion"].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  ["who", "budget", "occasion"].indexOf(step) >= i
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Who */}
      {step === "who" && (
        <div className="space-y-4">
          <h2 className="text-center text-xl font-bold">
            Pour qui cherches-tu un cadeau ?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {WHO_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setWho(opt.value)
                  setStep("budget")
                }}
                className="flex flex-col items-center gap-2 rounded-xl border-2 border-transparent bg-muted/30 p-6 transition-all hover:border-primary hover:bg-primary/5"
              >
                <span className="text-4xl">{opt.emoji}</span>
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Budget */}
      {step === "budget" && (
        <div className="space-y-4">
          <h2 className="text-center text-xl font-bold">
            Quel est ton budget ?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {BUDGET_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setBudget(opt.value)
                  setStep("occasion")
                }}
                className="rounded-xl border-2 border-transparent bg-muted/30 p-5 text-center transition-all hover:border-primary hover:bg-primary/5"
              >
                <span className="text-lg font-bold">{opt.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("who")}
            className="mx-auto block text-sm text-muted-foreground hover:text-foreground"
          >
            ← Retour
          </button>
        </div>
      )}

      {/* Step 3: Occasion */}
      {step === "occasion" && (
        <div className="space-y-4">
          <h2 className="text-center text-xl font-bold">
            Quelle est l&apos;occasion ?
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {OCCASION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleFinish(opt.value)}
                className="flex flex-col items-center gap-1 rounded-xl border-2 border-transparent bg-muted/30 p-4 transition-all hover:border-primary hover:bg-primary/5"
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep("budget")}
            className="mx-auto block text-sm text-muted-foreground hover:text-foreground"
          >
            ← Retour
          </button>
        </div>
      )}

      {/* Results */}
      {step === "results" && (
        <div>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">Nos recommandations pour toi</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {WHO_OPTIONS.find((o) => o.value === who)?.label} ·{" "}
              {BUDGET_OPTIONS.find((o) => o.value === budget)?.label} ·{" "}
              {OCCASION_OPTIONS.find((o) => o.value === occasion)?.label}
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-muted-foreground">
              Recherche en cours...
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                Aucun produit trouvé pour ces critères. Essayez avec des filtres
                différents !
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center gap-3">
            <Button variant="outline" onClick={restart}>
              Recommencer le quiz
            </Button>
            <Button render={<Link href="/produits" />}>
              Voir tous les produits
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
