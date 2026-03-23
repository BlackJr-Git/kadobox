import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { getOrdersByUser } from "@/lib/queries/orders"
import { redirect } from "next/navigation"

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
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Mes commandes</h1>
        <div className="rounded-lg border p-8 text-center">
          <span className="text-4xl">📦</span>
          <h2 className="mt-4 text-lg font-bold">
            Aucune commande pour le moment
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Vos commandes apparaîtront ici une fois que vous aurez passé une
            commande.
          </p>
          <Button className="mt-4" render={<Link href="/produits" />}>
            Découvrir nos produits
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mes commandes ({orders.length})</h1>
      <div className="space-y-4">
        {orders.map((o) => {
          const status = STATUS_LABELS[o.status] ?? {
            label: o.status,
            variant: "secondary" as const,
          }
          return (
            <div key={o.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{o.orderNumber}</span>
                  <span className="ml-3 text-sm text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {o.items.length} article{o.items.length !== 1 ? "s" : ""}
                </span>
                <span className="font-bold">
                  {Number(o.total).toLocaleString("fr-CD")} CDF
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
