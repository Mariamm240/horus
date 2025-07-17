import { db } from "@/lib/db/db"
import { products } from "@/lib/schema"
import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Buscar producto por slug
    const product = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1)

    if (product.length === 0) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product: product[0]
    })

  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
