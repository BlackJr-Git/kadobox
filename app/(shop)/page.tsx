import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product/product-grid"
import { getOccasions } from "@/lib/queries/occasions"
import { getFeaturedProducts, getLatestProducts } from "@/lib/queries/products"
import { getBundles } from "@/lib/queries/bundles"

const BUDGET_RANGES = [
  { label: "Moins de 5 000 CDF", min: 0, max: 5000, emoji: "💰" },
  { label: "5 000 – 15 000 CDF", min: 5000, max: 15000, emoji: "💎" },
  { label: "15 000 – 50 000 CDF", min: 15000, max: 50000, emoji: "🎯" },
  { label: "Plus de 50 000 CDF", min: 50000, max: undefined, emoji: "👑" },
]

const GIFT_IDEAS = [
  {
    label: "Pour lui",
    gender: "homme",
    emoji: "👨",
    href: "/produits?genre=homme",
  },
  {
    label: "Pour elle",
    gender: "femme",
    emoji: "👩",
    href: "/produits?genre=femme",
  },
  {
    label: "Pour enfant",
    gender: "enfant",
    emoji: "👶",
    href: "/produits?genre=enfant",
  },
]

export default async function HomePage() {
  const [occasions, featured, latest, bundles] = await Promise.all([
    getOccasions(),
    getFeaturedProducts(),
    getLatestProducts(),
    getBundles(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-primary/10">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Trouve le cadeau parfait{" "}
              <span className="text-primary">en 30 secondes</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Des cadeaux pour chaque occasion, personnalisés avec amour. Fini
              le stress, on s&apos;occupe de tout.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" render={<Link href="#occasions" />}>
                Trouver un cadeau
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/coffrets" />}
              >
                Voir les coffrets
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section id="occasions" className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Par occasion</h2>
          <p className="mt-2 text-muted-foreground">
            Quel événement fêtes-tu ?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              href={`/occasion/${occ.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-5 text-center transition-all hover:border-primary/50 hover:shadow-md"
            >
              <span className="text-3xl">{occ.icon || "🎁"}</span>
              <span className="text-sm font-medium group-hover:text-primary">
                {occ.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / Best sellers */}
      {featured.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  Best sellers 🔥
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Les cadeaux les plus populaires
                </p>
              </div>
            </div>
            <ProductGrid products={featured} />
          </div>
        </section>
      )}

      {/* Budget */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Par budget</h2>
          <p className="mt-2 text-muted-foreground">
            Combien veux-tu dépenser ?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {BUDGET_RANGES.map((range) => (
            <Link
              key={range.label}
              href={`/produits?minPrice=${range.min}${range.max ? `&maxPrice=${range.max}` : ""}`}
              className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
            >
              <span className="text-3xl">{range.emoji}</span>
              <span className="text-sm font-medium group-hover:text-primary">
                {range.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Idées cadeaux par genre */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Idées cadeaux</h2>
            <p className="mt-2 text-muted-foreground">Pour qui cherches-tu ?</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {GIFT_IDEAS.map((idea) => (
              <Link
                key={idea.gender}
                href={idea.href}
                className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-8 text-center transition-all hover:border-primary/50 hover:shadow-md"
              >
                <span className="text-5xl">{idea.emoji}</span>
                <span className="text-base font-semibold group-hover:text-primary">
                  {idea.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nouveautés */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Nouveautés ✨</h2>
              <p className="mt-1 text-muted-foreground">
                Les derniers arrivages
              </p>
            </div>
          </div>
          <ProductGrid products={latest} />
        </section>
      )}

      {/* Coffrets */}
      {bundles.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  Coffrets cadeaux 📦
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Des coffrets composés à prix réduit
                </p>
              </div>
              <Button variant="outline" render={<Link href="/coffrets" />}>
                Voir tout
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {bundles.slice(0, 3).map((b) => {
                const savings = Number(b.regularPrice) - Number(b.bundlePrice)
                const savingsPercent = Math.round(
                  (savings / Number(b.regularPrice)) * 100
                )
                return (
                  <Link
                    key={b.id}
                    href={`/coffret/${b.slug}`}
                    className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md"
                  >
                    <div className="flex h-40 items-center justify-center bg-muted text-5xl">
                      📦
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold group-hover:text-primary">
                        {b.name}
                      </h3>
                      {b.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {b.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold">
                          {Number(b.bundlePrice).toLocaleString("fr-CD")} CDF
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {Number(b.regularPrice).toLocaleString("fr-CD")} CDF
                        </span>
                        {savingsPercent > 0 && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                            -{savingsPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary/5 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Pas d&apos;inspiration ?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Laisse-nous te guider ! Réponds à 3 questions et on te propose le
            cadeau idéal.
          </p>
          <Button
            size="lg"
            className="mt-6"
            render={<Link href="/recommandation" />}
          >
            Lancer le quiz 🧠
          </Button>
        </div>
      </section>
    </>
  )
}
