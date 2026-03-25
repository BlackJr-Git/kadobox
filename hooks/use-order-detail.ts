import { useQuery } from "@tanstack/react-query"

interface OrderDetail {
  id: string
  orderNumber: string
  status: string
  subtotal: string
  shippingCost: string
  total: string
  notes?: string
  paymentMethod?: string
  paymentReference?: string
  paidAt?: string
  shippedAt?: string
  deliveredAt?: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    name: string
    email: string
    phone?: string
  }
  shippingAddress?: {
    id: string
    fullName: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    province?: string
    country: string
  }
  items: Array<{
    id: string
    quantity: number
    unitPrice: string
    totalPrice: string
    product?: {
      id: string
      name: string
      images?: Array<{
        id: string
        url: string
        alt?: string
      }>
    }
    giftCustomization?: {
      id: string
      message?: string
      wrappingType: string
      senderName?: string
      recipientName?: string
    }
  }>
}

async function fetchOrderDetail(orderId: string): Promise<OrderDetail> {
  const response = await fetch(`/api/orders/${orderId}`)
  
  if (!response.ok) {
    throw new Error("Commande non trouvée")
  }
  
  return response.json()
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrderDetail(orderId),
    enabled: !!orderId,
    staleTime: 30 * 1000, // 30 seconds
  })
}
