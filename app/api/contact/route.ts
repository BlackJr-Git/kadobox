import { NextRequest, NextResponse } from "next/server"
import { contactFormSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // TODO: Send email via Resend
    console.log("Contact form:", { name, email, subject, message })

    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé avec succès !",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    )
  }
}
