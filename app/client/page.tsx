import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getOrdersByUser } from "@/lib/queries/orders"
import { getFeaturedProducts, getLatestProducts } from "@/lib/queries/products"
import Link from "next/link"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingBag03Icon,
  PackageIcon,
  TruckDeliveryIcon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
  FavouriteIcon,
  GiftIcon,
  SparklesIcon,
  Fire02Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"

export default async function ClientPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")

  const [orders, featured, latest] = await Promise.all([
    getOrdersByUser(session.user.id),
    getFeaturedProducts(),
    getLatestProducts(),
  ])

  const recentOrders = orders.slice(0, 2)

  const totalOrders = orders.length
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length
  const pendingOrders = orders.filter((o) =>
    ["pending", "paid", "processing", "shipped"].includes(o.status)
  ).length

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <HugeiconsIcon icon={SparklesIcon} className="h-4 w-4" />
            Espace personnel
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Bonjour, {session.user.name?.split(" ")[0]} !
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Bienvenue dans votre espace. Découvrez vos commandes, gérez vos
            souhaits et trouvez le cadeau parfait.
          </p>
        </div>
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-20 -bottom-10 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Commandes
                </p>
                <p className="mt-2 text-3xl font-bold">{totalOrders}</p>
                <p className="mt-1 text-xs text-muted-foreground">Au total</p>
              </div>
              <div className="rounded-2xl bg-primary/10 p-4">
                <HugeiconsIcon
                  icon={ShoppingBag03Icon}
                  className="h-6 w-6 text-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  En cours
                </p>
                <p className="mt-2 text-3xl font-bold">{pendingOrders}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  En traitement
                </p>
              </div>
              <div className="rounded-2xl bg-amber-500/10 p-4">
                <HugeiconsIcon
                  icon={PackageIcon}
                  className="h-6 w-6 text-amber-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Livrées
                </p>
                <p className="mt-2 text-3xl font-bold">{deliveredOrders}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Avec succès
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-500/10 p-4">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="h-6 w-6 text-emerald-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Link href="/client/liste-souhaits" className="group">
          <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Mes souhaits
                  </p>
                  <p className="mt-2 text-lg font-semibold text-rose-600 group-hover:underline">
                    Voir la liste
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Gérer mes envies
                  </p>
                </div>
                <div className="rounded-2xl bg-rose-500/10 p-4">
                  <HugeiconsIcon
                    icon={FavouriteIcon}
                    className="h-6 w-6 text-rose-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Actions - Bento Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/produits" className="group md:col-span-2">
          <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="relative flex h-full min-h-[140px] flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <HugeiconsIcon icon={SparklesIcon} className="h-3 w-3" />
                    Recommandé
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary">
                    Découvrir nos cadeaux
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Trouvez le cadeau parfait pour chaque occasion
                  </p>
                </div>
                <div className="rounded-xl bg-primary/10 p-3">
                  <HugeiconsIcon
                    icon={GiftIcon}
                    className="h-6 w-6 text-primary"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                Explorer maintenant
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/client/commandes" className="group">
          <Card className="relative h-full overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="relative flex h-full min-h-[140px] flex-col justify-between p-6">
              <div>
                <div className="mb-3 w-fit rounded-xl bg-amber-500/10 p-3">
                  <HugeiconsIcon
                    icon={TruckDeliveryIcon}
                    className="h-6 w-6 text-amber-600"
                  />
                </div>
                <h3 className="font-semibold group-hover:text-primary">
                  Mes commandes
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Suivre vos livraisons
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                Voir tout
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Orders */}
      {recentOrders.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    className="h-5 w-5 text-primary"
                  />
                  Commandes récentes
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Vos {recentOrders.length} dernières commandes
                </p>
              </div>
              {orders.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  render={<Link href="/client/commandes" />}
                >
                  Voir tout
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    className="ml-1 h-4 w-4"
                  />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((o) => {
                const statusConfig: Record<
                  string,
                  {
                    label: string
                    variant: "default" | "secondary" | "outline"
                  }
                > = {
                  pending: { label: "En attente", variant: "secondary" },
                  paid: { label: "Payée", variant: "default" },
                  processing: { label: "En préparation", variant: "default" },
                  shipped: { label: "Expédiée", variant: "default" },
                  delivered: { label: "Livrée", variant: "outline" },
                }
                const status = statusConfig[o.status] ?? {
                  label: o.status,
                  variant: "secondary" as const,
                }

                return (
                  <div
                    key={o.id}
                    className="group flex flex-col gap-3 rounded-lg border bg-card p-4 transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <HugeiconsIcon
                          icon={PackageIcon}
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{o.orderNumber}</span>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            {new Date(o.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          <span>•</span>
                          <span>
                            {o.items.length} article
                            {o.items.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <span className="text-lg font-bold">
                        {Number(o.total).toLocaleString("fr-CD")} CDF
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        render={<Link href={`/client/commandes/${o.id}`} />}
                      >
                        Voir détails
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          className="ml-1 h-4 w-4"
                        />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Fire02Icon}
                    className="h-5 w-5 text-orange-500"
                  />
                  Produits populaires
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Les cadeaux les plus appréciés
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                render={<Link href="/produits" />}
              >
                Voir tout
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="ml-1 h-4 w-4"
                />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featured.slice(0, 4).map((product) => {
                const mainImage = product.images?.sort(
                  (a, b) => a.sortOrder - b.sortOrder
                )[0]
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    compareAtPrice={product.compareAtPrice}
                    image={mainImage?.url}
                    imageAlt={mainImage?.alt}
                    isFeatured={product.isFeatured}
                  />
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State for No Orders */}
      {recentOrders.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6">
              <HugeiconsIcon
                icon={PackageIcon}
                className="h-12 w-12 text-muted-foreground"
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold">
              Aucune commande pour le moment
            </h3>
            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
              Commencez vos achats et découvrez notre sélection de cadeaux
              uniques
            </p>
            <Button
              className="mt-6"
              size="lg"
              render={<Link href="/produits" />}
            >
              <HugeiconsIcon icon={GiftIcon} className="mr-2 h-5 w-5" />
              Découvrir nos produits
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
