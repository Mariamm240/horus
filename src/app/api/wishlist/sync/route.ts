import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { wishlist, userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (!wishlist || !Array.isArray(wishlist.items)) {
      return NextResponse.json(
        { error: 'Invalid wishlist data' },
        { status: 400 }
      )
    }

    // Save wishlist to Firestore
    await setDoc(doc(db, 'wishlists', userId), {
      ...wishlist,
      updatedAt: new Date(),
      userId
    })

    return NextResponse.json({
      success: true,
      message: 'Wishlist synced successfully'
    })
  } catch (error) {
    console.error('Error syncing wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to sync wishlist' },
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

    // Get wishlist from Firestore
    const wishlistDoc = await getDoc(doc(db, 'wishlists', userId))
    
    if (!wishlistDoc.exists()) {
      return NextResponse.json({
        items: [],
        count: 0,
        updatedAt: new Date()
      })
    }

    const wishlistData = wishlistDoc.data()
    
    return NextResponse.json({
      ...wishlistData,
      updatedAt: wishlistData.updatedAt.toDate()
    })
  } catch (error) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}
