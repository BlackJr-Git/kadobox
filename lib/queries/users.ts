import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { user, shippingAddress } from "@/lib/schema"
import { serializeData } from "@/lib/serialize"

export async function getUserById(userId: string) {
  const result = await db.query.user.findFirst({
    where: eq(user.id, userId),
  })
  return serializeData(result)
}

export async function getUserAddresses(userId: string) {
  const result = await db.query.shippingAddress.findMany({
    where: eq(shippingAddress.userId, userId),
  })
  return serializeData(result)
}
