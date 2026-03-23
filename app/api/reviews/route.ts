import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { review } from "@/lib/schema"
import { reviewSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = reviewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { productId, rating, comment } = parsed.data
    const userId = body.userId

    if (!userId) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour laisser un avis" },
        { status: 401 }
      )
    }

    const [newReview] = await db
      .insert(review)
      .values({
        id: crypto.randomUUID(),
        productId,
        userId,
        rating,
        comment: comment || null,
      })
      .returning()

    return NextResponse.json({ review: newReview })
  } catch (error) {
    console.error("Review creation error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de l'avis" },
      { status: 500 }
    )
  }
}
