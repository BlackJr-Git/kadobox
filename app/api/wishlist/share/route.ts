import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/lib/db"
import { wishlist } from "@/lib/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    // Récupérer la wishlist de l'utilisateur
    const userWishlist = await db.query.wishlist.findFirst({
      where: eq(wishlist.userId, session.user.id),
    })

    if (!userWishlist) {
      return NextResponse.json(
        { error: "Liste de souhaits introuvable" },
        { status: 404 }
      )
    }

    // Générer un ID de partage unique basé sur l'ID de la wishlist
    const shareId = Buffer.from(userWishlist.id).toString("base64url")

    return NextResponse.json({ shareId })
  } catch (error) {
    console.error("Error generating share link:", error)
    return NextResponse.json(
      { error: "Erreur lors de la génération du lien" },
      { status: 500 }
    )
  }
}
