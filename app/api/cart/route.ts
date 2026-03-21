import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { product } from "@/lib/schema"
import { inArray } from "drizzle-orm"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productIds } = body as { productIds: string[] }

    if (!productIds || productIds.length === 0) {
      return NextResponse.json({ products: [] })
    }

    const products = await db.query.product.findMany({
      where: inArray(product.id, productIds),
      with: { images: true },
      columns: {
        id: true,
        name: true,
        slug: true,
        price: true,
        stock: true,
        isActive: true,
      },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Cart validation error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la validation du panier" },
      { status: 500 }
    )
  }
}
