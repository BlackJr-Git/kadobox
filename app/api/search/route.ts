import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { product } from "@/lib/schema"
import { eq, and, ilike, or } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const q = searchParams.get("q")

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ products: [] })
  }

  const term = `%${q.trim()}%`

  const results = await db.query.product.findMany({
    where: and(
      eq(product.isActive, true),
      or(
        ilike(product.name, term),
        ilike(product.description, term),
        ilike(product.shortDescription, term)
      )
    ),
    with: { images: true },
    limit: 20,
  })

  return NextResponse.json({ products: results })
}
