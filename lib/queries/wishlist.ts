import { eq, and } from "drizzle-orm"
import { db } from "@/lib/db"
import { wishlist, wishlistItem } from "@/lib/schema"
import { serializeData } from "@/lib/serialize"

export async function getWishlistByUser(userId: string) {
  const result = await db.query.wishlist.findFirst({
    where: eq(wishlist.userId, userId),
    with: {
      items: {
        with: {
          product: {
            with: { images: true },
          },
        },
      },
    },
  })
  return serializeData(result)
}

export async function getOrCreateWishlist(userId: string) {
  const existing = await db.query.wishlist.findFirst({
    where: eq(wishlist.userId, userId),
  })

  if (existing) return serializeData(existing)

  const [created] = await db
    .insert(wishlist)
    .values({
      id: crypto.randomUUID(),
      userId,
    })
    .returning()

  return serializeData(created)
}

export async function addToWishlist(userId: string, productId: string) {
  const wl = await getOrCreateWishlist(userId)

  const existing = await db.query.wishlistItem.findFirst({
    where: and(
      eq(wishlistItem.wishlistId, wl.id),
      eq(wishlistItem.productId, productId)
    ),
  })

  if (existing) return serializeData(existing)

  const [item] = await db
    .insert(wishlistItem)
    .values({
      id: crypto.randomUUID(),
      wishlistId: wl.id,
      productId,
    })
    .returning()

  return serializeData(item)
}

export async function removeFromWishlist(userId: string, productId: string) {
  const wl = await getOrCreateWishlist(userId)

  await db
    .delete(wishlistItem)
    .where(
      and(
        eq(wishlistItem.wishlistId, wl.id),
        eq(wishlistItem.productId, productId)
      )
    )
}
