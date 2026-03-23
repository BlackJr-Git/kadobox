import { db } from "@/lib/db"
import { order } from "@/lib/schema"
import { desc } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const STATUS_LABELS: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  pending: { label: "En attente", variant: "secondary" },
  paid: { label: "Payée", variant: "default" },
  processing: { label: "En préparation", variant: "default" },
  shipped: { label: "Expédiée", variant: "default" },
  delivered: { label: "Livrée", variant: "outline" },
  cancelled: { label: "Annulée", variant: "destructive" },
}

export async function RecentOrdersTable() {
  const recentOrders = await db.query.order.findMany({
    with: { user: true, items: true },
    orderBy: [desc(order.createdAt)],
    limit: 10,
  })

  if (recentOrders.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Aucune commande pour le moment.
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Articles</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((o) => {
            const status = STATUS_LABELS[o.status] || {
              label: o.status,
              variant: "secondary" as const,
            }
            return (
              <TableRow key={o.id}>
                <TableCell className="font-medium">{o.orderNumber}</TableCell>
                <TableCell>{o.user?.name || "—"}</TableCell>
                <TableCell>{o.items.length}</TableCell>
                <TableCell>
                  {Number(o.total).toLocaleString("fr-CD")} CDF
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(o.createdAt).toLocaleDateString("fr-FR")}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
