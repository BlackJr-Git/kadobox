import { db } from "@/lib/db"
import { order, product, user } from "@/lib/schema"
import { eq, sql } from "drizzle-orm"

export default async function AdminDashboardPage() {
  const [orderCount, revenueResult, productCount, clientCount] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(order),
      db
        .select({ total: sql<string>`coalesce(sum(${order.total}), '0')` })
        .from(order)
        .where(eq(order.status, "paid")),
      db
        .select({ count: sql<number>`count(*)` })
        .from(product)
        .where(eq(product.isActive, true)),
      db.select({ count: sql<number>`count(*)` }).from(user),
    ])

  const orders = Number(orderCount[0]?.count ?? 0)
  const revenue = Number(revenueResult[0]?.total ?? 0)
  const products = Number(productCount[0]?.count ?? 0)
  const clients = Number(clientCount[0]?.count ?? 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Commandes</p>
          <p className="mt-1 text-3xl font-bold">{orders}</p>
        </div>
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">
            Chiffre d&apos;affaires
          </p>
          <p className="mt-1 text-3xl font-bold">
            {revenue.toLocaleString("fr-CD")} CDF
          </p>
        </div>
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Produits actifs</p>
          <p className="mt-1 text-3xl font-bold">{products}</p>
        </div>
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Clients</p>
          <p className="mt-1 text-3xl font-bold">{clients}</p>
        </div>
      </div>
    </div>
  )
}
