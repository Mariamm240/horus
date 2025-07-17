import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { createOrderFromCart } from "@/lib/woo/wooOrders"
import { handleOrderWebhook } from "@/lib/woo/wooOrders"

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Stripe credentials are required")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia"
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (error) {
      console.error("Webhook signature verification failed:", error)
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      )
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentSucceeded(paymentIntent)
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailed(paymentIntent)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log("Processing completed checkout session:", session.id)

    // Get line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product']
    })

    // Extract metadata
    const metadata = session.metadata || {}
    const customerId = metadata.customer_id ? parseInt(metadata.customer_id) : undefined
    const billingAddress = metadata.billing_address ? JSON.parse(metadata.billing_address) : {}
    const shippingAddress = metadata.shipping_address ? JSON.parse(metadata.shipping_address) : {}
    const couponCode = metadata.coupon_code || undefined

    // Convert Stripe line items to WooCommerce cart items
    const cartItems = lineItems.data.map(item => {
      const product = item.price?.product as Stripe.Product
      const productMetadata = product.metadata || {}
      
      return {
        product_id: parseInt(productMetadata.woo_product_id || '0'),
        quantity: item.quantity || 1,
        variation_id: productMetadata.variation_id ? parseInt(productMetadata.variation_id) : undefined,
        meta_data: [
          {
            key: 'stripe_price_id',
            value: item.price?.id || ''
          },
          {
            key: 'stripe_session_id',
            value: session.id
          }
        ]
      }
    }).filter(item => item.product_id > 0)

    // Create order in WooCommerce
    if (cartItems.length > 0) {
      const wooOrder = await createOrderFromCart(
        cartItems,
        {
          ...billingAddress,
          email: session.customer_email || billingAddress.email
        },
        shippingAddress,
        customerId,
        "stripe",
        couponCode
      )

      // Update order with Stripe payment info
      if (wooOrder) {
        console.log(`Order created in WooCommerce: ${wooOrder.id}`)
        
        // You can update the order with additional Stripe info here
        // For example, add the Stripe session ID or payment intent ID
      }
    }

  } catch (error) {
    console.error("Error handling checkout completion:", error)
    throw error
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("Processing successful payment:", paymentIntent.id)
    
    // Here you could update the order status in WooCommerce
    // if you have the order ID stored in the payment intent metadata
    
  } catch (error) {
    console.error("Error handling payment success:", error)
    throw error
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log("Processing failed payment:", paymentIntent.id)
    
    // Here you could update the order status or send notification emails
    
  } catch (error) {
    console.error("Error handling payment failure:", error)
    throw error
  }
}
