import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db/db"
import { products } from "@/lib/schema"
import { eq, ilike, and, or, desc, asc } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Pagination
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const offset = (page - 1) * limit

    // Filters
    const search = searchParams.get("search")
    const brand = searchParams.get("brand")
    const frequency = searchParams.get("frequency")
    const sortBy = searchParams.get("sortBy") || "name"
    const sortOrder = searchParams.get("sortOrder") || "asc"

    // Build conditions
    const conditions = [eq(products.isActive, true)]

    if (search) {
      conditions.push(
        or(
          ilike(products.name, `%${search}%`),
          ilike(products.brand, `%${search}%`),
          ilike(products.description, `%${search}%`)
        )!
      )
    }

    if (brand && brand !== "Todas") {
      conditions.push(eq(products.brand, brand))
    }

    if (frequency && frequency !== "Todas") {
      conditions.push(eq(products.frequency, frequency))
    }

    // Sort options
    let orderBy
    switch (sortBy) {
      case "price":
        orderBy = sortOrder === "desc" ? desc(products.price) : asc(products.price)
        break
      case "rating":
        orderBy = sortOrder === "desc" ? desc(products.rating) : asc(products.rating)
        break
      case "createdAt":
        orderBy = sortOrder === "desc" ? desc(products.createdAt) : asc(products.createdAt)
        break
      default:
        orderBy = sortOrder === "desc" ? desc(products.name) : asc(products.name)
    }

    // Get products with pagination
    const productList = await db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        brand: products.brand,
        description: products.description,
        price: products.price,
        subscriptionPrice: products.subscriptionPrice,
        frequency: products.frequency,
        stock: products.stock,
        images: products.images,
        rating: products.rating,
        reviewCount: products.reviewCount,
        createdAt: products.createdAt,
      })
      .from(products)
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset)

    // Get total count for pagination
    const totalCount = await db
      .select({ count: products.id })
      .from(products)
      .where(and(...conditions))

    const total = totalCount.length
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      products: productList,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
