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
import { toast } from "sonner"

interface OrderStatusUpdateProps {
  orderId: string
  currentStatus: string
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
  const [status, setStatus] = useState<string | null>(currentStatus)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    if (!status || status === currentStatus) {
      toast.info("Le statut n'a pas changé")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error("Erreur lors de la mise à jour")

      toast.success("Statut mis à jour avec succès")
      window.location.reload()
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut")
      setStatus(currentStatus)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Select value={status} onValueChange={setStatus}>
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
        <Button onClick={handleUpdate} disabled={isLoading} className="w-full">
          {isLoading ? "Mise à jour..." : "Mettre à jour le statut"}
        </Button>
      )}
    </div>
  )
}
