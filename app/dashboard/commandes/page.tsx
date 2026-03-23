import { db } from "@/lib/db"
import { order } from "@/lib/schema"
import { desc } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"

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

export default async function DashboardCommandesPage() {
  const orders = await db.query.order.findMany({
    with: { user: true, items: true },
    orderBy: [desc(order.createdAt)],
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Commandes ({orders.length})</h1>

      {orders.length === 0 ? (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Aucune commande pour le moment.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">N° commande</th>
                <th className="px-4 py-3 text-left font-medium">Client</th>
                <th className="px-4 py-3 text-left font-medium">Articles</th>
                <th className="px-4 py-3 text-left font-medium">Total</th>
                <th className="px-4 py-3 text-left font-medium">Statut</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const status = STATUS_LABELS[o.status] || {
                  label: o.status,
                  variant: "secondary" as const,
                }
                return (
                  <tr key={o.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{o.orderNumber}</td>
                    <td className="px-4 py-3">{o.user?.name || "—"}</td>
                    <td className="px-4 py-3">{o.items.length}</td>
                    <td className="px-4 py-3">
                      {Number(o.total).toLocaleString("fr-CD")} CDF
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
