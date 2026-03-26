import { eq, desc } from "drizzle-orm"
import { db } from "@/lib/db"
import { order } from "@/lib/schema"
import { serializeData } from "@/lib/serialize"

export async function getOrdersByUser(userId: string) {
  const result = await db.query.order.findMany({
    where: eq(order.userId, userId),
    with: {
      items: {
        with: {
          product: {
            with: { images: true },
          },
          giftCustomization: true,
        },
      },
      shippingAddress: true,
    },
    orderBy: [desc(order.createdAt)],
  })
  return serializeData(result)
}

export async function getOrderById(orderId: string) {
  const result = await db.query.order.findFirst({
    where: eq(order.id, orderId),
    with: {
      items: {
        with: {
          product: {
            with: { images: true },
          },
          giftCustomization: true,
        },
      },
      shippingAddress: true,
      user: true,
    },
  })
  return serializeData(result)
}

export async function getOrderByNumber(orderNumber: string) {
  const result = await db.query.order.findFirst({
    where: eq(order.orderNumber, orderNumber),
    with: {
      items: {
        with: {
          product: {
            with: { images: true },
          },
          giftCustomization: true,
        },
      },
      shippingAddress: true,
    },
  })
  return serializeData(result)
}

export function generateOrderNumber() {
  const chars = "0123456789"
  let result = "KDB-"
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
