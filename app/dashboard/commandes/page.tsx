import { db } from "@/lib/db"
import { order } from "@/lib/schema"
import { desc } from "drizzle-orm"
import { OrdersTable } from "@/components/orders/orders-table"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Download04Icon, PlusSignIcon } from "@hugeicons/core-free-icons"
import Link from "next/link"

export default async function DashboardCommandesPage() {
  const orders = await db.query.order.findMany({
    with: { user: true, items: true },
    orderBy: [desc(order.createdAt)],
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Commandes</h1>
          <p className="text-sm text-muted-foreground">
            Gérez toutes vos commandes en un seul endroit
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" />
            Exporter
          </Button>
        </div>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}
