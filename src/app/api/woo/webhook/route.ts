import { NextRequest, NextResponse } from "next/server"
import { handleOrderWebhook } from "@/lib/woo/wooOrders"
import { WooOrder } from "@/lib/woo/wooClient"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const bodyJson = JSON.parse(body)
    
    // Verify webhook signature if configured
    const signature = request.headers.get("x-wc-webhook-signature")
    const webhookSecret = process.env.WOO_WEBHOOK_SECRET
    
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body, "utf8")
        .digest("base64")
      
      if (signature !== expectedSignature) {
        console.error("Invalid webhook signature")
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        )
      }
    }

    const eventType = request.headers.get("x-wc-webhook-topic")
    
    switch (eventType) {
      case "order.created":
      case "order.updated":
        await handleOrderWebhook(bodyJson as WooOrder)
        break
        
      case "order.deleted":
        await handleOrderDeleted(bodyJson.id)
        break
        
      case "product.created":
      case "product.updated":
        await handleProductUpdated(bodyJson)
        break
        
      case "product.deleted":
        await handleProductDeleted(bodyJson.id)
        break
        
      default:
        console.log(`Unhandled webhook event: ${eventType}`)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

async function handleOrderDeleted(orderId: number) {
  try {
    // Here you could mark the order as deleted in your local DB
    console.log(`Order deleted: ${orderId}`)
  } catch (error) {
    console.error("Error handling order deletion:", error)
  }
}

async function handleProductUpdated(product: any) {
  try {
    // Trigger ISR revalidation for product pages
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: `/shop/${product.slug}`,
        secret: process.env.REVALIDATE_SECRET
      })
    })
    
    // Also revalidate shop listing
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "/shop",
        secret: process.env.REVALIDATE_SECRET
      })
    })
    
    console.log(`Product updated: ${product.name}`)
  } catch (error) {
    console.error("Error handling product update:", error)
  }
}

async function handleProductDeleted(productId: number) {
  try {
    // Trigger ISR revalidation for shop listing
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "/shop",
        secret: process.env.REVALIDATE_SECRET
      })
    })
    
    console.log(`Product deleted: ${productId}`)
  } catch (error) {
    console.error("Error handling product deletion:", error)
  }
}
