const MAXICASH_API_URL =
  process.env.MAXICASH_API_URL || "https://api.maxicash.co"
const MAXICASH_MERCHANT_ID = process.env.MAXICASH_MERCHANT_ID || ""
const MAXICASH_SECRET = process.env.MAXICASH_SECRET || ""

export type PaymentRequest = {
  orderId: string
  orderNumber: string
  amount: number
  currency: string
  customerPhone: string
  customerEmail: string
  description: string
  callbackUrl: string
  returnUrl: string
}

export type PaymentResponse = {
  success: boolean
  transactionId?: string
  paymentUrl?: string
  error?: string
}

export async function initiatePayment(
  request: PaymentRequest
): Promise<PaymentResponse> {
  try {
    const payload = {
      merchantId: MAXICASH_MERCHANT_ID,
      amount: request.amount,
      currency: request.currency || "CDF",
      reference: request.orderNumber,
      description: request.description,
      phone: request.customerPhone,
      email: request.customerEmail,
      callbackUrl: request.callbackUrl,
      returnUrl: request.returnUrl,
    }

    const response = await fetch(`${MAXICASH_API_URL}/payments/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAXICASH_SECRET}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.text()
      return { success: false, error: `Maxicash error: ${errorData}` }
    }

    const data = await response.json()

    return {
      success: true,
      transactionId: data.transactionId,
      paymentUrl: data.paymentUrl,
    }
  } catch (error) {
    console.error("Payment initiation error:", error)
    return {
      success: false,
      error: "Impossible de contacter le service de paiement",
    }
  }
}

export async function verifyWebhookSignature(
  payload: string,
  signature: string
): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(MAXICASH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload))
  const expectedSignature = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  return signature === expectedSignature
}

export type PaymentStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled"

export function mapMaxicashStatus(status: string): PaymentStatus {
  const statusMap: Record<string, PaymentStatus> = {
    PENDING: "pending",
    PROCESSING: "processing",
    SUCCESS: "completed",
    SUCCESSFUL: "completed",
    FAILED: "failed",
    CANCELLED: "cancelled",
  }
  return statusMap[status.toUpperCase()] || "pending"
}
