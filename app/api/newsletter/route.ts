import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("Email invalide"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    const { email } = result.data

    // TODO: Integrate with Resend audience or store in DB
    console.log("Newsletter signup:", email)

    return NextResponse.json({
      success: true,
      message: "Merci pour votre inscription !",
    })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    )
  }
}
