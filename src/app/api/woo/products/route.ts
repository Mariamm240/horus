import { NextRequest, NextResponse } from "next/server"
import { getWooProducts } from "@/lib/woo/wooProducts"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const page = parseInt(searchParams.get("page") || "1")
    const per_page = parseInt(searchParams.get("per_page") || "20")
    const search = searchParams.get("search") || undefined
    const category = searchParams.get("category") || undefined
    const tag = searchParams.get("tag") || undefined
    const featured = searchParams.get("featured") === "true" ? true : undefined
    const on_sale = searchParams.get("on_sale") === "true" ? true : undefined
    const min_price = searchParams.get("min_price") || undefined
    const max_price = searchParams.get("max_price") || undefined
    const orderby = (searchParams.get("orderby") as any) || "date"
    const order = (searchParams.get("order") as "asc" | "desc") || "desc"

    const result = await getWooProducts({
      page,
      per_page,
      search,
      category,
      tag,
      featured,
      on_sale,
      min_price,
      max_price,
      orderby,
      order
    })

    // Set caching headers
    const response = NextResponse.json(result)
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    )

    return response

  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
