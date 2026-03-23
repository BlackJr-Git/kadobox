const RESEND_API_KEY = process.env.RESEND_API_KEY || ""
const FROM_EMAIL = process.env.FROM_EMAIL || "KDOBOX <noreply@kdobox.com>"

type EmailOptions = {
  to: string
  subject: string
  html: string
}

async function sendEmail({ to, subject, html }: EmailOptions) {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email send")
    return { success: false, error: "Email service not configured" }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error("Resend error:", error)
      return { success: false, error }
    }

    const data = await res.json()
    return { success: true, id: data.id }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendOrderConfirmation({
  to,
  orderNumber,
  customerName,
  total,
  itemCount,
}: {
  to: string
  orderNumber: string
  customerName: string
  total: number
  itemCount: number
}) {
  return sendEmail({
    to,
    subject: `Commande ${orderNumber} confirmée - KDOBOX`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Merci pour votre commande !</h1>
        <p>Bonjour ${customerName},</p>
        <p>Votre commande <strong>${orderNumber}</strong> a bien été enregistrée.</p>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0;"><strong>Numéro :</strong> ${orderNumber}</p>
          <p style="margin: 4px 0;"><strong>Articles :</strong> ${itemCount}</p>
          <p style="margin: 4px 0;"><strong>Total :</strong> ${total.toLocaleString("fr-CD")} CDF</p>
        </div>
        <p>Nous vous tiendrons informé de l'avancement de votre commande.</p>
        <p>L'équipe KDOBOX</p>
      </div>
    `,
  })
}

export async function sendShippingNotification({
  to,
  orderNumber,
  customerName,
}: {
  to: string
  orderNumber: string
  customerName: string
}) {
  return sendEmail({
    to,
    subject: `Commande ${orderNumber} expédiée - KDOBOX`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Votre commande est en route !</h1>
        <p>Bonjour ${customerName},</p>
        <p>Votre commande <strong>${orderNumber}</strong> a été expédiée.</p>
        <p>Vous recevrez votre colis très bientôt.</p>
        <p>L'équipe KDOBOX</p>
      </div>
    `,
  })
}

export async function sendPasswordReset({
  to,
  resetUrl,
}: {
  to: string
  resetUrl: string
}) {
  return sendEmail({
    to,
    subject: "Réinitialisation de mot de passe - KDOBOX",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Réinitialisation de mot de passe</h1>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>
          <a href="${resetUrl}" 
             style="display: inline-block; background: #e91e63; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Réinitialiser mon mot de passe
          </a>
        </p>
        <p style="color: #666; font-size: 14px;">Ce lien expire dans 1 heure. Si vous n'avez pas fait cette demande, ignorez cet email.</p>
        <p>L'équipe KDOBOX</p>
      </div>
    `,
  })
}

export async function sendGiftCardEmail({
  to,
  code,
  amount,
  senderName,
  message,
}: {
  to: string
  code: string
  amount: number
  senderName: string
  message?: string
}) {
  return sendEmail({
    to,
    subject: `${senderName} vous a offert une carte cadeau KDOBOX !`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Vous avez reçu une carte cadeau !</h1>
        <p>${senderName} vous a offert une carte cadeau KDOBOX.</p>
        ${message ? `<p style="font-style: italic; color: #555;">"${message}"</p>` : ""}
        <div style="background: linear-gradient(135deg, #e91e63, #9c27b0); color: white; padding: 24px; border-radius: 12px; text-align: center; margin: 16px 0;">
          <p style="margin: 0; font-size: 14px;">Carte cadeau KDOBOX</p>
          <p style="margin: 8px 0; font-size: 28px; font-weight: bold;">${amount.toLocaleString("fr-CD")} CDF</p>
          <p style="margin: 0; font-size: 18px; font-family: monospace; letter-spacing: 2px;">${code}</p>
        </div>
        <p>Utilisez ce code lors du paiement sur <a href="https://kdobox.com">kdobox.com</a>.</p>
        <p>L'équipe KDOBOX</p>
      </div>
    `,
  })
}
