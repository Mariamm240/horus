import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/firebase'
import { db } from '@/lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cart, userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (!cart || !Array.isArray(cart.items)) {
      return NextResponse.json(
        { error: 'Invalid cart data' },
        { status: 400 }
      )
    }

    // Save cart to Firestore
    await setDoc(doc(db, 'carts', userId), {
      ...cart,
      updatedAt: new Date(),
      userId
    })

    return NextResponse.json({
      success: true,
      message: 'Cart synced successfully'
    })
  } catch (error) {
    console.error('Error syncing cart:', error)
    return NextResponse.json(
      { error: 'Failed to sync cart' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get cart from Firestore
    const cartDoc = await getDoc(doc(db, 'carts', userId))
    
    if (!cartDoc.exists()) {
      return NextResponse.json({
        items: [],
        total: 0,
        itemCount: 0,
        updatedAt: new Date()
      })
    }

    const cartData = cartDoc.data()
    
    return NextResponse.json({
      ...cartData,
      updatedAt: cartData.updatedAt.toDate()
    })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}
