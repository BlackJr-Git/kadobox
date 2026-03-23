import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { order } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { verifyWebhookSignature, mapMaxicashStatus } from "@/lib/services/payment"
import { sendOrderConfirmation } from "@/lib/services/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-maxicash-signature") || ""

    const isValid = await verifyWebhookSignature(body, signature)
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      )
    }

    const payload = JSON.parse(body)
    const { reference, status: rawStatus, transactionId } = payload

    const existingOrder = await db.query.order.findFirst({
      where: eq(order.orderNumber, reference),
      with: { user: true, items: true },
    })

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    const paymentStatus = mapMaxicashStatus(rawStatus)

    if (paymentStatus === "completed") {
      await db
        .update(order)
        .set({
          status: "paid",
          paidAt: new Date(),
          paymentMethod: "maxicash",
          paymentReference: transactionId,
        })
        .where(eq(order.id, existingOrder.id))

      if (existingOrder.user?.email) {
        await sendOrderConfirmation({
          to: existingOrder.user.email,
          orderNumber: existingOrder.orderNumber,
          customerName: existingOrder.user.name,
          total: Number(existingOrder.total),
          itemCount: existingOrder.items.length,
        })
      }
    } else if (paymentStatus === "failed" || paymentStatus === "cancelled") {
      await db
        .update(order)
        .set({ status: "cancelled" })
        .where(eq(order.id, existingOrder.id))
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Maxicash webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
