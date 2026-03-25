import { db } from "@/lib/db"
import { order } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: "Le statut est requis" },
        { status: 400 }
      )
    }

    const validStatuses = [
      "pending",
      "paid",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 })
    }

    const updateData: {
      status: OrderStatus
      paidAt?: Date
      shippedAt?: Date
      deliveredAt?: Date
    } = { status: status as OrderStatus }

    if (status === "paid") {
      updateData.paidAt = new Date()
    } else if (status === "shipped") {
      updateData.shippedAt = new Date()
    } else if (status === "delivered") {
      updateData.deliveredAt = new Date()
    }

    await db.update(order).set(updateData).where(eq(order.id, params.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    )
  }
}
