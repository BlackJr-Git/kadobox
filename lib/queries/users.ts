import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { user, shippingAddress } from "@/lib/schema"

export async function getUserById(userId: string) {
  return db.query.user.findFirst({
    where: eq(user.id, userId),
  })
}

export async function getUserAddresses(userId: string) {
  return db.query.shippingAddress.findMany({
    where: eq(shippingAddress.userId, userId),
  })
}
