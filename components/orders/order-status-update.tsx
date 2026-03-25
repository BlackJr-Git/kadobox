"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUpdateOrderStatus } from "@/hooks/use-update-order-status"

type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

interface OrderStatusUpdateProps {
  orderId: string
  currentStatus: OrderStatus
}

const STATUS_OPTIONS = [
  { value: "pending", label: "En attente" },
  { value: "paid", label: "Payée" },
  { value: "processing", label: "En préparation" },
  { value: "shipped", label: "Expédiée" },
  { value: "delivered", label: "Livrée" },
  { value: "cancelled", label: "Annulée" },
]

export function OrderStatusUpdate({
  orderId,
  currentStatus,
}: OrderStatusUpdateProps) {
  const [status, setStatus] = useState<OrderStatus | null>(currentStatus)
  const updateOrderStatus = useUpdateOrderStatus()

  const handleUpdate = () => {
    if (!status || status === currentStatus) {
      return
    }

    updateOrderStatus.mutate({
      orderId,
      status,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <Select
        value={status}
        onValueChange={setStatus}
        disabled={updateOrderStatus.isPending}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {status && status !== currentStatus && (
        <Button
          onClick={handleUpdate}
          disabled={updateOrderStatus.isPending}
          className="w-full"
        >
          {updateOrderStatus.isPending
            ? "Mise à jour..."
            : "Mettre à jour le statut"}
        </Button>
      )}
    </div>
  )
}
