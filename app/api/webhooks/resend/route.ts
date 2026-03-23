import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const { type, data } = payload

    switch (type) {
      case "email.sent":
        console.log(`Email sent: ${data.email_id}`)
        break
      case "email.delivered":
        console.log(`Email delivered: ${data.email_id}`)
        break
      case "email.bounced":
        console.error(`Email bounced: ${data.email_id}`, data)
        break
      case "email.complained":
        console.error(`Email complaint: ${data.email_id}`, data)
        break
      default:
        console.log(`Unknown Resend event: ${type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Resend webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
