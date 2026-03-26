"use client"

import { useOrderDetail } from "@/hooks/use-order-detail"
import { OrderStatusUpdate } from "./order-status-update"
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

interface OrderDetailClientProps {
  orderId: string
}

export function OrderDetailClient({ orderId }: OrderDetailClientProps) {
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
            render={<Link href="/dashboard/commandes" />}
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
                          {item.giftCustomization.message && (
                            <p className="text-sm text-muted-foreground">
                              Message: {item.giftCustomization.message}
                            </p>
                          )}
                          {item.giftCustomization.wrappingType && (
                            <p className="text-sm text-muted-foreground">
                              Emballage: {item.giftCustomization.wrappingType}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>
                    {Number(orderData.subtotal).toLocaleString("fr-CD")} CDF
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Frais de livraison
                  </span>
                  <span>
                    {Number(orderData.shippingCost).toLocaleString("fr-CD")} CDF
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-lg">
                    {Number(orderData.total).toLocaleString("fr-CD")} CDF
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {orderData.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {orderData.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Statut de la commande</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Statut actuel</span>
                <OrderStatusBadge status={orderData.status} />
              </div>
              <OrderStatusUpdate
                orderId={orderData.id}
                currentStatus={orderData.status as OrderStatus}
              />
              <Separator />
              <div className="flex flex-col gap-3 text-sm">
                {orderData.paidAt && (
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={CalendarIcon}
                      className="text-muted-foreground"
                    />
                    <div>
                      <p className="font-medium">Payée le</p>
                      <p className="text-muted-foreground">
                        {new Date(orderData.paidAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                )}
                {orderData.shippedAt && (
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={PackageIcon}
                      className="text-muted-foreground"
                    />
                    <div>
                      <p className="font-medium">Expédiée le</p>
                      <p className="text-muted-foreground">
                        {new Date(orderData.shippedAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {orderData.deliveredAt && (
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={CalendarIcon}
                      className="text-muted-foreground"
                    />
                    <div>
                      <p className="font-medium">Livrée le</p>
                      <p className="text-muted-foreground">
                        {new Date(orderData.deliveredAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations client</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={UserIcon}
                  className="mt-0.5 text-muted-foreground"
                />
                <div className="flex-1">
                  <p className="font-medium">{orderData.user?.name || "—"}</p>
                  <p className="text-sm text-muted-foreground">
                    {orderData.user?.email || "—"}
                  </p>
                  {orderData.user?.phone && (
                    <p className="text-sm text-muted-foreground">
                      {orderData.user.phone}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {orderData.shippingAddress && (
            <Card>
              <CardHeader>
                <CardTitle>Adresse de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={LocationIcon}
                    className="mt-0.5 text-muted-foreground"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">
                      {orderData.shippingAddress.fullName}
                    </p>
                    <p className="text-muted-foreground">
                      {orderData.shippingAddress.addressLine1}
                    </p>
                    {orderData.shippingAddress.addressLine2 && (
                      <p className="text-muted-foreground">
                        {orderData.shippingAddress.addressLine2}
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      {orderData.shippingAddress.city}
                      {orderData.shippingAddress.province &&
                        `, ${orderData.shippingAddress.province}`}
                    </p>
                    <p className="text-muted-foreground">
                      {orderData.shippingAddress.country}
                    </p>
                    <p className="text-muted-foreground">
                      {orderData.shippingAddress.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {orderData.paymentMethod && (
            <Card>
              <CardHeader>
                <CardTitle>Paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={CreditCardIcon}
                    className="mt-0.5 text-muted-foreground"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{orderData.paymentMethod}</p>
                    {orderData.paymentReference && (
                      <p className="text-muted-foreground">
                        Réf: {orderData.paymentReference}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
