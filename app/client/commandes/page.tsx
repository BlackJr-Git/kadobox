import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getOrdersByUser } from "@/lib/queries/orders"
import { redirect } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PackageIcon,
  ArrowRight01Icon,
  ShoppingBag03Icon,
  CalendarIcon,
} from "@hugeicons/core-free-icons"
import { Card, CardContent } from "@/components/ui/card"

const STATUS_LABELS: Record<
  string,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  pending: { label: "En attente", variant: "secondary" },
  paid: { label: "Payée", variant: "default" },
  processing: { label: "En préparation", variant: "default" },
  shipped: { label: "Expédiée", variant: "default" },
  delivered: { label: "Livrée", variant: "outline" },
  cancelled: { label: "Annulée", variant: "destructive" },
}

export default async function ClientCommandesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/login")

  const orders = await getOrdersByUser(session.user.id)

  if (orders.length === 0) {
    return (
      <div className="space-y-6 pb-20 md:pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes commandes</h1>
          <p className="mt-2 text-muted-foreground">
            Suivez l'état de vos commandes
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-6">
              <HugeiconsIcon
                icon={ShoppingBag03Icon}
                className="h-12 w-12 text-muted-foreground"
              />
            </div>
            <h2 className="mt-6 text-xl font-bold">
              Aucune commande pour le moment
            </h2>
            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
              Vos commandes apparaîtront ici une fois que vous aurez passé une
              commande.
            </p>
            <Button
              className="mt-6"
              size="lg"
              render={<Link href="/produits" />}
            >
              <HugeiconsIcon
                icon={ShoppingBag03Icon}
                className="mr-2 h-5 w-5"
              />
              Découvrir nos produits
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes commandes</h1>
          <p className="mt-2 text-muted-foreground">
            {orders.length} commande{orders.length > 1 ? "s" : ""} au total
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((o) => {
          const status = STATUS_LABELS[o.status] ?? {
            label: o.status,
            variant: "secondary" as const,
          }
          return (
            <Card
              key={o.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {o.orderNumber}
                        </h3>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <HugeiconsIcon
                            icon={CalendarIcon}
                            className="h-4 w-4"
                          />
                          <span>
                            {new Date(o.createdAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                          <HugeiconsIcon
                            icon={PackageIcon}
                            className="h-4 w-4"
                          />
                          <span>
                            {o.items.length} article
                            {o.items.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold">
                          {Number(o.total).toLocaleString("fr-CD")} CDF
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Items Preview */}
                  {o.items.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Articles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {o.items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="rounded-md bg-muted px-3 py-1.5 text-sm"
                          >
                            {item.product?.name || "Produit"} ×{item.quantity}
                          </div>
                        ))}
                        {o.items.length > 3 && (
                          <div className="rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground">
                            +{o.items.length - 3} autre
                            {o.items.length - 3 > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <div className="flex justify-end border-t pt-4">
                    <Button
                      variant="outline"
                      render={<Link href={`/client/commandes/${o.id}`} />}
                    >
                      Voir les détails
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="ml-2 h-4 w-4"
                      />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
