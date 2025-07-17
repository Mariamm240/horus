import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { auth } from "@/lib/auth"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia"
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    
    const {
      items,
      billing,
      shipping,
      couponCode,
      successUrl,
      cancelUrl
    } = body

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items are required" },
        { status: 400 }
      )
    }

    if (!billing || !shipping) {
      return NextResponse.json(
        { error: "Billing and shipping addresses are required" },
        { status: 400 }
      )
    }

    // Calculate total and create line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description || `SKU: ${item.sku}`,
          images: item.image ? [item.image] : [],
          metadata: {
            woo_product_id: item.wooProductId?.toString() || '',
            sku: item.sku || '',
            variation_id: item.variationId?.toString() || ''
          }
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      customer_email: billing.email,
      shipping_address_collection: {
        allowed_countries: ['ES', 'FR', 'DE', 'IT', 'PT', 'GB']
      },
      billing_address_collection: 'required',
      metadata: {
        customer_id: session?.user?.id || '',
        billing_address: JSON.stringify(billing),
        shipping_address: JSON.stringify(shipping),
        coupon_code: couponCode || '',
        order_type: 'woocommerce'
      },
      custom_fields: [
        {
          key: 'customer_notes',
          label: {
            type: 'custom',
            custom: 'Notas adicionales'
          },
          type: 'text',
          optional: true
        }
      ],
      phone_number_collection: {
        enabled: true
      }
    })

    // Apply coupon if provided
    if (couponCode) {
      try {
        // Validate coupon with WooCommerce
        const couponResponse = await fetch(`${process.env.WOO_STORE_URL}/wp-json/wc/v3/coupons?code=${couponCode}`, {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.WOO_CONSUMER_KEY}:${process.env.WOO_CONSUMER_SECRET}`).toString('base64')}`
          }
        })
        
        if (couponResponse.ok) {
          const coupons = await couponResponse.json()
          if (coupons.length > 0) {
            // Update session with discount (this would need to be handled in a more complex way)
            console.log('Coupon validated:', coupons[0])
          }
        }
      } catch (error) {
        console.error('Error validating coupon:', error)
      }
    }

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url
    })

  } catch (error) {
    console.error('Error creating Stripe session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
