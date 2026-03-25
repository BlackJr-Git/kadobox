import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled"

interface UpdateOrderStatusVariables {
  orderId: string
  status: OrderStatus
}

async function updateOrderStatus({ orderId, status }: UpdateOrderStatusVariables) {
  const response = await fetch(`/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du statut")
  }

  return response.json()
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (data, variables) => {
      toast.success("Statut mis à jour avec succès")
      
      // Invalider les queries pertinentes
      queryClient.invalidateQueries({
        queryKey: ["order", variables.orderId]
      })
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      })
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour du statut")
      console.error("Update order status error:", error)
    },
  })
}
