import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db/db"
import { cart } from "@/lib/schema"
import { eq, and } from "drizzle-orm"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || session.user.id

    // Get cart items for the user
    const cartItems = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))

    return NextResponse.json({ items: cartItems })

  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId, items } = body

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Items array is required" },
        { status: 400 }
      )
    }

    // Clear existing cart items for the user
    await db.delete(cart).where(eq(cart.userId, userId))

    // Insert new cart items
    if (items.length > 0) {
      const cartData = items.map((item: any) => ({
        userId,
        productId: item.productId || null,
        wooProductId: item.wooProductId,
        quantity: item.quantity,
        price: item.price.toString(),
        variationId: item.variationId || null,
        metadata: item.metadata || {}
      }))

      await db.insert(cart).values(cartData)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Error saving cart:", error)
    return NextResponse.json(
      { error: "Failed to save cart" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || session.user.id
    const itemId = searchParams.get("itemId")

    if (itemId) {
      // Delete specific cart item
      await db
        .delete(cart)
        .where(and(
          eq(cart.userId, userId),
          eq(cart.id, parseInt(itemId))
        ))
    } else {
      // Clear entire cart
      await db.delete(cart).where(eq(cart.userId, userId))
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Error deleting cart item:", error)
    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 }
    )
  }
}
