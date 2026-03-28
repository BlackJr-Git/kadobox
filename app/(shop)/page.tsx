import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product/product-grid"
import { getOccasions } from "@/lib/queries/occasions"
import { getFeaturedProducts, getLatestProducts } from "@/lib/queries/products"
import { getBundles } from "@/lib/queries/bundles"

export const metadata: Metadata = {
  title: "Cadeau Chrono - Trouvez le cadeau parfait pour chaque occasion",
  description:
    "Découvrez des cadeaux uniques et personnalisés pour toutes les occasions. Livraison rapide à Kinshasa et partout en RDC. Des idées cadeaux pour lui, pour elle et pour enfants.",
  keywords: [
    "cadeaux",
    "Kinshasa",
    "RDC",
    "livraison",
    "occasions",
    "anniversaire",
    "mariage",
    "Saint-Valentin",
  ],
  openGraph: {
    title: "Cadeau Chrono - Trouvez le cadeau parfait pour chaque occasion",
    description:
      "Découvrez des cadeaux uniques et personnalisés pour toutes les occasions. Livraison rapide à Kinshasa et partout en RDC.",
    type: "website",
    locale: "fr_CD",
    url: "https://kadobox.vercel.app",
    siteName: "Cadeau Chrono",
    images: [
      {
        url: "https://kadobox.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cadeau Chrono - Cadeaux pour toutes les occasions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cadeau Chrono - Trouvez le cadeau parfait pour chaque occasion",
    description:
      "Découvrez des cadeaux uniques et personnalisés pour toutes les occasions. Livraison rapide à Kinshasa et partout en RDC.",
    images: ["https://kadobox.vercel.app/og-image.jpg"],
  },
}

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
    image: "/men_illustration.png",
    href: "/produits?genre=homme",
  },
  {
    label: "Pour elle",
    gender: "femme",
    image: "/women_illustration.png",
    href: "/produits?genre=femme",
  },
  {
    label: "Pour enfant",
    gender: "enfant",
    image: "/kids_illustration.png",
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
      {/* Hero Bento Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3">
          {/* Main Hero Card - spans 2 cols, 2 rows */}
          <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary to-accent p-6 md:col-span-2 md:p-8">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                  ✨ Nouveau
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Trouve le cadeau
                  <br />
                  <span className="text-primary">parfait</span>
                </h1>
                <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
                  Des cadeaux uniques pour chaque occasion. Fini le stress, on
                  s&apos;occupe de tout.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
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
            <div className="absolute -right-10 -bottom-10 text-9xl opacity-10">
              🎁
            </div>
          </div>

          {/* Quick Gift Card */}
          <Link
            href="/recommandation"
            className="group relative overflow-hidden rounded-2xl bg-primary p-5 transition-all hover:shadow-lg"
          >
            <div className="relative z-10">
              <p className="text-xs text-primary-foreground/70">
                Pas d&apos;idée ?
              </p>
              <p className="mt-1 text-lg font-semibold text-primary-foreground">
                Quiz Cadeau
              </p>
              <p className="mt-1 text-xs text-primary-foreground/70">
                3 questions, 1 cadeau idéal
              </p>
            </div>
            <div className="absolute -right-2 -bottom-2 transition-transform group-hover:scale-110">
              <Image
                src="/quiz_cadeau.png"
                alt="Quiz Cadeau"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Stats Card */}
          <div className="group relative flex flex-col justify-center overflow-hidden rounded-2xl p-5 text-center">
            <Image
              src="/satisfaction.jpg"
              alt="Satisfaction garantie"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10">
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-xs text-white/90">Satisfaction garantie</p>
            </div>
          </div>

          {/* Occasion Card */}
          <Link
            href="/occasion/anniversaire"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-muted p-5 transition-all hover:shadow-lg"
          >
            <p className="relative z-10 text-xs font-medium text-muted-foreground">
              Occasions
            </p>
            <p className="relative z-10 mt-1 text-lg font-semibold text-foreground">
              Anniversaire
            </p>
            <p className="relative z-10 mt-1 text-xs text-muted-foreground">
              +12 autres occasions
            </p>
            <div className="absolute -right-2 -bottom-2 transition-transform group-hover:scale-110">
              <Image
                src="/anniverssaire.png"
                alt="Anniversaire"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Coffrets Card */}
          <Link
            href="/coffrets"
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <p className="text-xs font-medium text-muted-foreground">
              Prix réduits
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              Coffrets
            </p>
            <div className="absolute -right-2 -bottom-2 transition-transform group-hover:scale-110">
              <Image
                src="/coffret_hero.png"
                alt="Coffrets cadeaux"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Wishlist Card */}
          <Link
            href="/client/liste-souhaits"
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            <p className="text-xs font-medium text-muted-foreground">
              Partage tes envies
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              Ma Wishlist
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Crée et partage ta liste
            </p>
            <div className="absolute -right-2 -bottom-2 transition-transform group-hover:scale-110">
              <Image
                src="/gift_illustration.png"
                alt="Wishlist"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </Link>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GIFT_IDEAS.map((idea) => (
              <Link
                key={idea.gender}
                href={idea.href}
                className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md sm:p-6"
              >
                <div className="relative z-10 text-left">
                  <span className="text-base font-semibold group-hover:text-primary sm:text-lg">
                    {idea.label}
                  </span>
                </div>
                <div className="absolute -right-2 -bottom-2 transition-transform group-hover:scale-110">
                  <Image
                    src={idea.image}
                    alt={idea.label}
                    width={120}
                    height={120}
                    className="object-contain sm:h-24 sm:w-24"
                  />
                </div>
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
