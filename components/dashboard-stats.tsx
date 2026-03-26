import { db } from "@/lib/db"
import { order, product, user } from "@/lib/schema"
import { eq, sql, inArray } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChartUpIcon } from "@hugeicons/core-free-icons"

export async function DashboardStats() {
  const [orderCount, revenueResult, productCount, clientCount] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(order),
      db
        .select({ total: sql<string>`coalesce(sum(${order.total}), '0')` })
        .from(order)
        .where(
          inArray(order.status, ["paid", "processing", "shipped", "delivered"])
        ),
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
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Chiffre d&apos;affaires</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenue.toLocaleString("fr-CD")} CDF
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />
              Payé
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Revenus des commandes payées{" "}
            <HugeiconsIcon
              icon={ChartUpIcon}
              strokeWidth={2}
              className="size-4"
            />
          </div>
          <div className="text-muted-foreground">
            Total des ventes confirmées
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Commandes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {orders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />
              Total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Toutes les commandes{" "}
            <HugeiconsIcon
              icon={ChartUpIcon}
              strokeWidth={2}
              className="size-4"
            />
          </div>
          <div className="text-muted-foreground">
            Commandes en cours et livrées
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Produits actifs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {products}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />
              En vente
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Catalogue disponible{" "}
            <HugeiconsIcon
              icon={ChartUpIcon}
              strokeWidth={2}
              className="size-4"
            />
          </div>
          <div className="text-muted-foreground">Produits en stock</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Clients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {clients}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <HugeiconsIcon icon={ChartUpIcon} strokeWidth={2} />
              Inscrits
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Base clients active{" "}
            <HugeiconsIcon
              icon={ChartUpIcon}
              strokeWidth={2}
              className="size-4"
            />
          </div>
          <div className="text-muted-foreground">Utilisateurs enregistrés</div>
        </CardFooter>
      </Card>
    </div>
  )
}
