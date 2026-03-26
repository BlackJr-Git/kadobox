import { NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/queries/products"
import { db } from "@/lib/db"
import {
  product,
  productImage,
  productCategory,
  productOccasion,
} from "@/lib/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const gender = searchParams.get("gender") || undefined
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : 12
  const offset = searchParams.get("offset")
    ? Number(searchParams.get("offset"))
    : 0

  const products = await getProducts({
    limit,
    offset,
    gender,
    minPrice,
    maxPrice,
  })

  return NextResponse.json({ products })
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      description,
      price,
      stock,
      gender,
      isActive,
      images,
      categoryIds,
      occasionIds,
    } = body

    // Créer le produit
    const [newProduct] = await db
      .insert(product)
      .values({
        id: crypto.randomUUID(),
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        description,
        price: price.toString(),
        stock,
        gender,
        isActive: isActive ?? true,
      })
      .returning()

    // Ajouter les images
    if (images && images.length > 0) {
      await db.insert(productImage).values(
        images.map((img: { url: string; altText?: string }, index: number) => ({
          id: crypto.randomUUID(),
          productId: newProduct.id,
          url: img.url,
          altText: img.altText || name,
          sortOrder: index,
        }))
      )
    }

    // Lier aux catégories
    if (categoryIds && categoryIds.length > 0) {
      await db.insert(productCategory).values(
        categoryIds.map((categoryId: string) => ({
          productId: newProduct.id,
          categoryId,
        }))
      )
    }

    // Lier aux occasions
    if (occasionIds && occasionIds.length > 0) {
      await db.insert(productOccasion).values(
        occasionIds.map((occasionId: string) => ({
          productId: newProduct.id,
          occasionId,
        }))
      )
    }

    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création du produit" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    const {
      id,
      name,
      description,
      price,
      stock,
      gender,
      isActive,
      images,
      categoryIds,
      occasionIds,
    } = body

    if (!id) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      )
    }

    // Mettre à jour le produit
    const [updatedProduct] = await db
      .update(product)
      .set({
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        description,
        price: price.toString(),
        stock,
        gender,
        isActive,
      })
      .where(eq(product.id, id))
      .returning()

    // Supprimer les anciennes images
    await db.delete(productImage).where(eq(productImage.productId, id))

    // Ajouter les nouvelles images
    if (images && images.length > 0) {
      await db.insert(productImage).values(
        images.map((img: { url: string; altText?: string }, index: number) => ({
          id: crypto.randomUUID(),
          productId: id,
          url: img.url,
          altText: img.altText || name,
          sortOrder: index,
        }))
      )
    }

    // Mettre à jour les catégories
    await db.delete(productCategory).where(eq(productCategory.productId, id))
    if (categoryIds && categoryIds.length > 0) {
      await db.insert(productCategory).values(
        categoryIds.map((categoryId: string) => ({
          productId: id,
          categoryId,
        }))
      )
    }

    // Mettre à jour les occasions
    await db.delete(productOccasion).where(eq(productOccasion.productId, id))
    if (occasionIds && occasionIds.length > 0) {
      await db.insert(productOccasion).values(
        occasionIds.map((occasionId: string) => ({
          productId: id,
          occasionId,
        }))
      )
    }

    return NextResponse.json({ product: updatedProduct })
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du produit" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = request.nextUrl
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      )
    }

    await db.delete(product).where(eq(product.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Product deletion error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du produit" },
      { status: 500 }
    )
  }
}
