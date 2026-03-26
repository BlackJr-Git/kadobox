import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import {
  addToWishlist,
  removeFromWishlist,
  getWishlistByUser,
} from "@/lib/queries/wishlist"

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export async function GET() {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté" },
        { status: 401 }
      )
    }

    const wishlist = await getWishlistByUser(session.user.id)
    return NextResponse.json(wishlist || { id: "", items: [] })
  } catch (error) {
    console.error("Wishlist get error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la liste" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté" },
        { status: 401 }
      )
    }

    const { productId } = (await request.json()) as { productId: string }

    if (!productId) {
      return NextResponse.json({ error: "productId requis" }, { status: 400 })
    }

    const item = await addToWishlist(session.user.id, productId)
    return NextResponse.json({ item })
  } catch (error) {
    console.error("Wishlist add error:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'ajout à la liste de souhaits" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Vous devez être connecté" },
        { status: 401 }
      )
    }

    const { productId } = (await request.json()) as { productId: string }

    if (!productId) {
      return NextResponse.json({ error: "productId requis" }, { status: 400 })
    }

    await removeFromWishlist(session.user.id, productId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Wishlist remove error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    )
  }
}
