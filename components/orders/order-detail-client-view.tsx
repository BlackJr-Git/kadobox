"use client"

import { useOrderDetail } from "@/hooks/use-order-detail"
import { OrderStatusBadge } from "./order-status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  PrinterIcon,
  PackageIcon,
  UserIcon,
  LocationIcon,
  CalendarIcon,
  CreditCardIcon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"

type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

interface OrderDetailClientViewProps {
  orderId: string
}

export function OrderDetailClientView({ orderId }: OrderDetailClientViewProps) {
  const { data: orderData, isLoading, error } = useOrderDetail(orderId)

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (error || !orderData) {
    return <div>Erreur lors du chargement de la commande</div>
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            render={<Link href="/client/commandes" />}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              Commande {orderData.orderNumber}
            </h1>
            <p className="text-sm text-muted-foreground">
              Créée le{" "}
              {new Date(orderData.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <HugeiconsIcon icon={PrinterIcon} data-icon="inline-start" />
            Imprimer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-6 md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Articles commandés</CardTitle>
                <Badge variant="secondary">
                  {orderData.items.length} article
                  {orderData.items.length > 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border p-4"
                  >
                    <div className="size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.product?.images?.[0]?.url ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <HugeiconsIcon
                            icon={PackageIcon}
                            className="text-muted-foreground"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">
                            {item.product?.name || "Produit supprimé"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Quantité: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {Number(item.totalPrice).toLocaleString("fr-CD")}{" "}
                            CDF
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {Number(item.unitPrice).toLocaleString("fr-CD")} CDF
                            / unité
                          </p>
                        </div>
                      </div>
                      {item.giftCustomization && (
                        <div className="rounded-md bg-muted p-3">
                          <p className="text-sm font-medium">
                            Personnalisation cadeau
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.giftCustomization.message && (
                              <span>Message: {item.giftCustomization.message}</span>
                            )}
                            {item.giftCustomization.packaging && (
                              <span> • Emballage: {item.giftCustomization.packaging}</span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adresse de livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={LocationIcon}
                  className="mt-1 size-4 text-muted-foreground"
                />
                <div>
                  <p className="font-medium">{orderData.shippingAddress.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.postalCode}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.country}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-sm">Sous-total</span>
                  <span className="text-sm font-medium">
                    {Number(orderData.subtotal).toLocaleString("fr-CD")} CDF
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Livraison</span>
                  <span className="text-sm font-medium">
                    {Number(orderData.shippingCost).toLocaleString("fr-CD")} CDF
                  </span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="text-sm">Remise</span>
                    <span className="text-sm font-medium">
                      -{Number(orderData.discount).toLocaleString("fr-CD")} CDF
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">
                    {Number(orderData.total).toLocaleString("fr-CD")} CDF
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={UserIcon}
                    className="size-4 text-muted-foreground"
                  />
                  <div>
                    <p className="text-sm font-medium">Client</p>
                    <p className="text-sm text-muted-foreground">
                      {orderData.customerName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={CreditCardIcon}
                    className="size-4 text-muted-foreground"
                  />
                  <div>
                    <p className="text-sm font-medium">Paiement</p>
                    <p className="text-sm text-muted-foreground">
                      {orderData.paymentMethod === "mobile"
                        ? "Mobile Money"
                        : orderData.paymentMethod}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={CalendarIcon}
                    className="size-4 text-muted-foreground"
                  />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(orderData.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Statut actuel</span>
                <OrderStatusBadge status={orderData.status as OrderStatus} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
