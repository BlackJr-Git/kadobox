import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { getOrdersByUser } from "@/lib/queries/orders"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingBag03Icon,
  PackageIcon,
  TruckDeliveryIcon,
  CheckmarkCircle02Icon,
  ArrowRight01Icon,
  FavouriteIcon,
  GiftIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function ClientPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")

  const orders = await getOrdersByUser(session.user.id)
  const recentOrders = orders.slice(0, 3)

  const totalOrders = orders.length
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length
  const pendingOrders = orders.filter((o) =>
    ["pending", "paid", "processing", "shipped"].includes(o.status)
  ).length

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Bonjour, {session.user.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          Gérez vos commandes et découvrez de nouveaux cadeaux
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total commandes
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {totalOrders}
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <HugeiconsIcon
                  icon={ShoppingBag03Icon}
                  className="h-5 w-5 text-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-amber-500">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  En cours
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {pendingOrders}
                </p>
              </div>
              <div className="rounded-lg bg-amber-500/10 p-2.5">
                <HugeiconsIcon
                  icon={PackageIcon}
                  className="h-5 w-5 text-amber-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-emerald-500">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Livrées
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {deliveredOrders}
                </p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 p-2.5">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="h-5 w-5 text-emerald-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Link href="/client/liste-souhaits" className="group">
          <Card className="h-full overflow-hidden border-l-4 border-l-rose-500 transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Mes souhaits
                  </p>
                  <p className="text-sm font-medium text-rose-600 group-hover:underline">
                    Voir la liste →
                  </p>
                </div>
                <div className="rounded-lg bg-rose-500/10 p-2.5">
                  <HugeiconsIcon
                    icon={FavouriteIcon}
                    className="h-5 w-5 text-rose-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/produits" className="group">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <HugeiconsIcon
                    icon={GiftIcon}
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary">
                    Découvrir nos cadeaux
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Trouvez le cadeau parfait
                  </p>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/client/commandes" className="group">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-amber-500/10 p-3">
                  <HugeiconsIcon
                    icon={TruckDeliveryIcon}
                    className="h-6 w-6 text-amber-600"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary">
                    Suivre mes commandes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Voir l'état de livraison
                  </p>
                </div>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">
            Commandes récentes
          </h2>
          {orders.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/client/commandes" />}
            >
              Voir tout
              <HugeiconsIcon icon={ArrowRight01Icon} className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-4">
                <HugeiconsIcon
                  icon={PackageIcon}
                  className="h-8 w-8 text-muted-foreground"
                />
              </div>
              <h3 className="mt-4 font-semibold">Aucune commande</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Commencez vos achats pour voir vos commandes ici
              </p>
              <Button className="mt-4" render={<Link href="/produits" />}>
                Découvrir nos produits
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((o) => {
              const statusConfig: Record<
                string,
                { label: string; variant: "default" | "secondary" | "outline" }
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
                <Card
                  key={o.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{o.orderNumber}</span>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            {new Date(o.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <span>
                            {o.items.length} article
                            {o.items.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                        <span className="text-lg font-bold">
                          {Number(o.total).toLocaleString("fr-CD")} CDF
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          render={<Link href={`/client/commandes/${o.id}`} />}
                        >
                          Détails
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            className="ml-1 h-4 w-4"
                          />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
