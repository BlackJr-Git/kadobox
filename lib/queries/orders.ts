import { eq, desc } from "drizzle-orm"
import { db } from "@/lib/db"
import { order } from "@/lib/schema"

export async function getOrdersByUser(userId: string) {
  return db.query.order.findMany({
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
}

export async function getOrderById(orderId: string) {
  return db.query.order.findFirst({
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
}

export async function getOrderByNumber(orderNumber: string) {
  return db.query.order.findFirst({
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
}

export function generateOrderNumber() {
  const chars = "0123456789"
  let result = "KDB-"
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
