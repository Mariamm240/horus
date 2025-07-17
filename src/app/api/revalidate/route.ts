import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, secret } = body

    // Verify the secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid secret" },
        { status: 401 }
      )
    }

    if (!path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 400 }
      )
    }

    // Revalidate the path
    revalidatePath(path)
    
    console.log(`Revalidated path: ${path}`)

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Error revalidating:", error)
    return NextResponse.json(
      { error: "Error revalidating" },
      { status: 500 }
    )
  }
}
