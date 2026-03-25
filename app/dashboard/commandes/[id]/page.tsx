import { db } from "@/lib/db"
import { order, orderItem, product } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  OrderStatusBadge,
  STATUS_CONFIG,
} from "@/components/orders/order-status-badge"
import { OrderStatusUpdate } from "@/components/orders/order-status-update"
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
import { OrderDetailClient } from "@/components/orders/order-detail-client"

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  return <OrderDetailClient orderId={id} />
}
