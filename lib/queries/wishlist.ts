import { eq, and } from "drizzle-orm"
import { db } from "@/lib/db"
import { wishlist, wishlistItem } from "@/lib/schema"

export async function getWishlistByUser(userId: string) {
  return db.query.wishlist.findFirst({
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
}

export async function getOrCreateWishlist(userId: string) {
  const existing = await db.query.wishlist.findFirst({
    where: eq(wishlist.userId, userId),
  })

  if (existing) return existing

  const [created] = await db
    .insert(wishlist)
    .values({
      id: crypto.randomUUID(),
      userId,
    })
    .returning()

  return created
}

export async function addToWishlist(userId: string, productId: string) {
  const wl = await getOrCreateWishlist(userId)

  const existing = await db.query.wishlistItem.findFirst({
    where: and(
      eq(wishlistItem.wishlistId, wl.id),
      eq(wishlistItem.productId, productId)
    ),
  })

  if (existing) return existing

  const [item] = await db
    .insert(wishlistItem)
    .values({
      id: crypto.randomUUID(),
      wishlistId: wl.id,
      productId,
    })
    .returning()

  return item
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
