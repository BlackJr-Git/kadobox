import { NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/queries/products"

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

  const products = await getProducts({ limit, offset, gender, minPrice, maxPrice })

  return NextResponse.json({ products })
}
