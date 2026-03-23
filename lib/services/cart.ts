import { db } from "@/lib/db"
import { product } from "@/lib/schema"
import { inArray } from "drizzle-orm"

export type CartItemInput = {
  productId: string
  quantity: number
}

export type ValidatedCartItem = {
  productId: string
  name: string
  slug: string
  price: number
  stock: number
  quantity: number
  image: string | null
  isAvailable: boolean
}

export async function validateCart(
  items: CartItemInput[]
): Promise<{ validItems: ValidatedCartItem[]; errors: string[] }> {
  if (items.length === 0) {
    return { validItems: [], errors: [] }
  }

  const productIds = items.map((i) => i.productId)
  const products = await db.query.product.findMany({
    where: inArray(product.id, productIds),
    with: { images: true },
  })

  const errors: string[] = []
  const validItems: ValidatedCartItem[] = []

  for (const item of items) {
    const p = products.find((pr) => pr.id === item.productId)

    if (!p) {
      errors.push(`Produit introuvable: ${item.productId}`)
      continue
    }

    if (!p.isActive) {
      errors.push(`${p.name} n'est plus disponible`)
      continue
    }

    const quantity = Math.min(item.quantity, p.stock)
    if (quantity < item.quantity) {
      errors.push(`${p.name}: stock limité à ${p.stock} unités`)
    }

    const mainImage = p.images?.sort((a, b) => a.sortOrder - b.sortOrder)[0]

    validItems.push({
      productId: p.id,
      name: p.name,
      slug: p.slug,
      price: Number(p.price),
      stock: p.stock,
      quantity,
      image: mainImage?.url || null,
      isAvailable: p.stock > 0,
    })
  }

  return { validItems, errors }
}

export function calculateCartTotals(items: ValidatedCartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shippingCost = 0
  const total = subtotal + shippingCost

  return { subtotal, shippingCost, total, itemCount: items.length }
}
