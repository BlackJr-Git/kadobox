import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { order, orderItem, shippingAddress } from "@/lib/schema"
import { generateOrderNumber } from "@/lib/queries/orders"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour passer commande" },
        { status: 401 }
      )
    }
    const userId = session.user.id
    const body = await request.json()

    const { items, address, notes } = body as {
      items: {
        productId: string
        quantity: number
        unitPrice: number
      }[]
      address: {
        fullName: string
        phone: string
        addressLine1: string
        addressLine2?: string
        city: string
        province?: string
        country?: string
      }
      notes?: string
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 })
    }

    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
    const shippingCost = 0
    const total = subtotal + shippingCost

    const [addr] = await db
      .insert(shippingAddress)
      .values({
        id: crypto.randomUUID(),
        userId,
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || null,
        city: address.city,
        province: address.province || null,
        country: address.country || "RDC",
      })
      .returning()

    const orderId = crypto.randomUUID()
    const orderNumber = generateOrderNumber()

    const [newOrder] = await db
      .insert(order)
      .values({
        id: orderId,
        orderNumber,
        userId,
        status: "pending",
        subtotal: String(subtotal),
        shippingCost: String(shippingCost),
        total: String(total),
        shippingAddressId: addr.id,
        notes: notes || null,
      })
      .returning()

    await db.insert(orderItem).values(
      items.map((item) => ({
        id: crypto.randomUUID(),
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: String(item.unitPrice),
        totalPrice: String(item.unitPrice * item.quantity),
      }))
    )

    return NextResponse.json({
      order: newOrder,
      orderNumber,
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    )
  }
}
