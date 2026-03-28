import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductGrid } from "@/components/product/product-grid"
import { getOccasions } from "@/lib/queries/occasions"
import { getFeaturedProducts, getLatestProducts } from "@/lib/queries/products"
import { getBundles } from "@/lib/queries/bundles"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TruckDeliveryIcon,
  ShieldKeyIcon,
  CustomerSupportIcon,
  ArrowRight01Icon,
  SparklesIcon,
  Fire02Icon,
} from "@hugeicons/core-free-icons"

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
      {/* Hero Section - Modern & Engaging */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="bg-grid-pattern absolute inset-0 opacity-5" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <HugeiconsIcon icon={SparklesIcon} className="h-4 w-4" />
                Livraison rapide à Kinshasa
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Le cadeau{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  parfait
                </span>
                <br />
                pour chaque occasion
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Découvrez notre sélection de cadeaux uniques et personnalisés.
                Livraison rapide partout en RDC.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="text-base"
                  render={<Link href="/produits" />}
                >
                  Explorer les cadeaux
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className="ml-2 h-5 w-5"
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base"
                  render={<Link href="/recommandation" />}
                >
                  Quiz cadeau
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground">Produits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-xs text-muted-foreground">Satisfait</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">24h</p>
                  <p className="text-xs text-muted-foreground">Livraison</p>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/recommandation"
                className="group relative overflow-hidden rounded-2xl bg-primary p-6 transition-all hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                    <HugeiconsIcon icon={SparklesIcon} className="h-3 w-3" />
                    Populaire
                  </div>
                  <h3 className="text-xl font-bold text-white">Quiz Cadeau</h3>
                  <p className="mt-2 text-sm text-white/90">
                    3 questions pour trouver le cadeau idéal
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 transition-transform group-hover:scale-110">
                  <Image
                    src="/quiz_cadeau.png"
                    alt="Quiz"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </Link>

              <Link
                href="/coffrets"
                className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-6 transition-all hover:border-primary hover:shadow-xl"
              >
                <div className="relative z-10">
                  <Badge className="mb-3">-20%</Badge>
                  <h3 className="text-xl font-bold">Coffrets</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Économisez avec nos coffrets composés
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 transition-transform group-hover:scale-110">
                  <Image
                    src="/coffret_hero.png"
                    alt="Coffrets"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </Link>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6">
                <div className="relative z-10">
                  <div className="mb-3 w-fit rounded-full bg-emerald-500/10 p-3">
                    <HugeiconsIcon
                      icon={ShieldKeyIcon}
                      className="h-6 w-6 text-emerald-600"
                    />
                  </div>
                  <h3 className="font-bold">100% Sécurisé</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Paiement et données protégés
                  </p>
                </div>
              </div>

              <Link
                href="/client/liste-souhaits"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 to-rose-500/5 p-6 transition-all hover:shadow-xl"
              >
                <div className="relative z-10">
                  <h3 className="font-bold">Ma Wishlist</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Crée et partage tes envies
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 transition-transform group-hover:scale-110">
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
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <HugeiconsIcon
                  icon={TruckDeliveryIcon}
                  className="h-6 w-6 text-primary"
                />
              </div>
              <div>
                <h3 className="font-semibold">Livraison rapide</h3>
                <p className="text-sm text-muted-foreground">
                  24-48h à Kinshasa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <HugeiconsIcon
                  icon={ShieldKeyIcon}
                  className="h-6 w-6 text-primary"
                />
              </div>
              <div>
                <h3 className="font-semibold">Paiement sécurisé</h3>
                <p className="text-sm text-muted-foreground">100% protégé</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <HugeiconsIcon
                  icon={CustomerSupportIcon}
                  className="h-6 w-6 text-primary"
                />
              </div>
              <div>
                <h3 className="font-semibold">Support client</h3>
                <p className="text-sm text-muted-foreground">7j/7 disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Link
            href="/occasion/anniversaire"
            className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="relative z-10">
              <p className="text-sm text-muted-foreground">Occasions</p>
              <h3 className="mt-1 text-lg font-bold group-hover:text-primary">
                Anniversaire
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                +12 occasions
              </p>
            </div>
            <div className="absolute -right-3 -bottom-3 transition-transform group-hover:scale-110">
              <Image
                src="/anniverssaire.png"
                alt="Anniversaire"
                width={90}
                height={90}
                className="object-contain opacity-80"
              />
            </div>
          </Link>

          <Link
            href="/produits?genre=homme"
            className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="relative z-10">
              <p className="text-sm text-muted-foreground">Cadeaux</p>
              <h3 className="mt-1 text-lg font-bold group-hover:text-primary">
                Pour lui
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">Idées homme</p>
            </div>
            <div className="absolute -right-3 -bottom-3 transition-transform group-hover:scale-110">
              <Image
                src="/men_illustration.png"
                alt="Pour lui"
                width={90}
                height={90}
                className="object-contain opacity-80"
              />
            </div>
          </Link>

          <Link
            href="/produits?genre=femme"
            className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="relative z-10">
              <p className="text-sm text-muted-foreground">Cadeaux</p>
              <h3 className="mt-1 text-lg font-bold group-hover:text-primary">
                Pour elle
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">Idées femme</p>
            </div>
            <div className="absolute -right-3 -bottom-3 transition-transform group-hover:scale-110">
              <Image
                src="/women_illustration.png"
                alt="Pour elle"
                width={90}
                height={90}
                className="object-contain opacity-80"
              />
            </div>
          </Link>

          <Link
            href="/produits?genre=enfant"
            className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
          >
            <div className="relative z-10">
              <p className="text-sm text-muted-foreground">Cadeaux</p>
              <h3 className="mt-1 text-lg font-bold group-hover:text-primary">
                Pour enfant
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">Idées enfant</p>
            </div>
            <div className="absolute -right-3 -bottom-3 transition-transform group-hover:scale-110">
              <Image
                src="/kids_illustration.png"
                alt="Pour enfant"
                width={90}
                height={90}
                className="object-contain opacity-80"
              />
            </div>
          </Link>
        </div>
      </section>

      {/* Occasions */}
      <section id="occasions" className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Trouvez par occasion
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Quel événement célébrez-vous ?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {occasions.map((occ) => (
            <Link
              key={occ.id}
              href={`/occasion/${occ.slug}`}
              className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-card p-6 text-center transition-all hover:border-primary hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <span className="inline-block text-4xl transition-transform group-hover:scale-110">
                  {occ.icon || "🎁"}
                </span>
                <span className="mt-3 block text-sm font-semibold group-hover:text-primary">
                  {occ.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / Best sellers */}
      {featured.length > 0 && (
        <section className="bg-gradient-to-b from-background to-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-600">
                <HugeiconsIcon icon={Fire02Icon} className="h-4 w-4" />
                Tendances
              </div>
              <h2 className="text-3xl font-bold md:text-4xl">Best sellers</h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Les cadeaux les plus populaires du moment
              </p>
            </div>
            <ProductGrid products={featured} maxColumns={5} />
            <div className="mt-12 text-center">
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/produits" />}
              >
                Voir tous les produits
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="ml-2 h-5 w-5"
                />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Budget */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Trouvez par budget
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Des cadeaux pour tous les budgets
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {BUDGET_RANGES.map((range) => (
              <Link
                key={range.label}
                href={`/produits?minPrice=${range.min}${range.max ? `&maxPrice=${range.max}` : ""}`}
                className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-card p-8 text-center transition-all hover:border-primary hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <span className="inline-block text-5xl transition-transform group-hover:scale-110">
                    {range.emoji}
                  </span>
                  <span className="mt-4 block text-sm font-semibold group-hover:text-primary">
                    {range.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Idées cadeaux par genre */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Idées cadeaux</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Pour qui cherchez-vous ?
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GIFT_IDEAS.map((idea) => (
            <Link
              key={idea.gender}
              href={idea.href}
              className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-card to-muted/30 p-10 transition-all hover:border-primary hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold group-hover:text-primary">
                  {idea.label}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Découvrez notre sélection
                </p>
              </div>
              <div className="absolute -right-6 -bottom-6 transition-transform group-hover:scale-110 group-hover:rotate-6">
                <Image
                  src={idea.image}
                  alt={idea.label}
                  width={160}
                  height={160}
                  className="object-contain opacity-90"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Nouveautés */}
      {latest.length > 0 && (
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <HugeiconsIcon icon={SparklesIcon} className="h-4 w-4" />
                Nouveautés
              </div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Derniers arrivages
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Découvrez nos tout nouveaux produits
              </p>
            </div>
            <ProductGrid products={latest} maxColumns={5} />
          </div>
        </section>
      )}

      {/* Coffrets */}
      {bundles.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Coffrets cadeaux
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Économisez avec nos coffrets composés
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/coffrets" />}
            >
              Voir tout
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bundles.slice(0, 3).map((b) => {
              const savings = Number(b.regularPrice) - Number(b.bundlePrice)
              const savingsPercent = Math.round(
                (savings / Number(b.regularPrice)) * 100
              )
              return (
                <Card
                  key={b.id}
                  className="group overflow-hidden transition-all hover:shadow-xl"
                >
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-primary/10 to-muted text-6xl">
                    📦
                    {savingsPercent > 0 && (
                      <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                        -{savingsPercent}%
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Link href={`/coffret/${b.slug}`}>
                      <h3 className="text-xl font-bold group-hover:text-primary">
                        {b.name}
                      </h3>
                    </Link>
                    {b.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {b.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        {Number(b.bundlePrice).toLocaleString("fr-CD")} CDF
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {Number(b.regularPrice).toLocaleString("fr-CD")} CDF
                      </span>
                    </div>
                    <Button
                      className="mt-4 w-full"
                      render={<Link href={`/coffret/${b.slug}`} />}
                    >
                      Voir le coffret
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-24">
        <div className="bg-grid-pattern absolute inset-0 opacity-10" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
            <HugeiconsIcon icon={SparklesIcon} className="h-4 w-4" />
            Trouvez le cadeau parfait
          </div>
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Besoin d&apos;aide pour choisir ?
          </h2>
          <p className="mt-6 text-lg text-white/90">
            Notre quiz intelligent vous guide en 3 questions pour trouver le
            cadeau idéal. Rapide, simple et personnalisé.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-base"
              render={<Link href="/recommandation" />}
            >
              Lancer le quiz
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-base text-white hover:bg-white/10"
              render={<Link href="/produits" />}
            >
              Parcourir les produits
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
