"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusBadge } from "./order-status-badge"
import { OrderActions } from "./order-actions"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, FilterIcon } from "@hugeicons/core-free-icons"
import Link from "next/link"
import {
  Empty,
  EmptyContent,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"

interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  unitPrice: string
  totalPrice: string
  product?: {
    id: string
    name: string
    slug: string
    price: string
    images?: Array<{
      id: string
      url: string
      alt?: string
      sortOrder: number
    }>
  }
  giftCustomization?: {
    id: string
    message?: string
    senderName?: string
    recipientName?: string
    image?: string
    wrappingType: "standard" | "premium" | "luxury"
    deliveryDate?: Date
    isGift: boolean
  }
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: string
  createdAt: Date
  user: { name: string; email: string } | null
  items: OrderItem[]
}

interface OrdersTableProps {
  orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      statusFilter === null ||
      order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Rechercher par numéro, client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <HugeiconsIcon icon={FilterIcon} />
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="paid">Payée</SelectItem>
                <SelectItem value="processing">En préparation</SelectItem>
                <SelectItem value="shipped">Expédiée</SelectItem>
                <SelectItem value="delivered">Livrée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <Empty>
              <EmptyContent>
                <EmptyTitle>Aucune commande trouvée</EmptyTitle>
                <EmptyDescription>
                  {searchQuery ||
                  (statusFilter !== "all" && statusFilter !== null)
                    ? "Essayez de modifier vos filtres"
                    : "Les commandes apparaîtront ici"}
                </EmptyDescription>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° commande</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/dashboard/commandes/${order.id}`}
                          className="hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">
                            {order.user?.name || "—"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {order.user?.email || "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell className="font-medium">
                        {Number(order.total).toLocaleString("fr-CD")} CDF
                      </TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <OrderActions
                          orderId={order.id}
                          orderNumber={order.orderNumber}
                          currentStatus={order.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredOrders.length} commande{filteredOrders.length > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  )
}
