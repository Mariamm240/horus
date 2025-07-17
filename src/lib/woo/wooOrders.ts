import wooClient, { WooOrder, WooAddress } from "./wooClient"
import { db } from "../db/db"
import { orders, orderItems } from "../schema"

export interface CartItem {
  product_id: number
  quantity: number
  variation_id?: number
  meta_data?: Array<{
    key: string
    value: string
  }>
}

export interface CreateOrderData {
  customer_id?: number
  billing: WooAddress
  shipping: WooAddress
  line_items: CartItem[]
  coupon_lines?: Array<{
    code: string
  }>
  payment_method: string
  payment_method_title: string
  customer_note?: string
  meta_data?: Array<{
    key: string
    value: string
  }>
}

export async function createWooOrder(orderData: CreateOrderData): Promise<WooOrder> {
  try {
    const response = await wooClient.post("orders", orderData)
    return response.data as WooOrder
  } catch (error) {
    console.error("Error creating WooCommerce order:", error)
    throw new Error("Failed to create order in WooCommerce")
  }
}

export async function getWooOrder(orderId: number): Promise<WooOrder | null> {
  try {
    const response = await wooClient.get(`orders/${orderId}`)
    return response.data as WooOrder
  } catch (error) {
    console.error("Error fetching WooCommerce order:", error)
    return null
  }
}

export async function updateWooOrderStatus(orderId: number, status: string): Promise<WooOrder | null> {
  try {
    const response = await wooClient.put(`orders/${orderId}`, { status })
    return response.data as WooOrder
  } catch (error) {
    console.error("Error updating WooCommerce order status:", error)
    return null
  }
}

export async function getCustomerOrders(customerId: number, page: number = 1, perPage: number = 10) {
  try {
    const response = await wooClient.get("orders", {
      customer: customerId,
      page,
      per_page: perPage,
      orderby: 'date',
      order: 'desc'
    })
    
    return {
      orders: response.data as WooOrder[],
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0')
    }
  } catch (error) {
    console.error("Error fetching customer orders:", error)
    throw new Error("Failed to fetch customer orders")
  }
}

// Crear orden desde el carrito local
export async function createOrderFromCart(
  cartItems: CartItem[],
  billing: WooAddress,
  shipping: WooAddress,
  customerId?: number,
  paymentMethod: string = "stripe",
  couponCode?: string
): Promise<WooOrder> {
  try {
    const orderData: CreateOrderData = {
      billing,
      shipping,
      line_items: cartItems,
      payment_method: paymentMethod,
      payment_method_title: paymentMethod === "stripe" ? "Tarjeta de Crédito" : "Otro método",
      status: "pending"
    }

    if (customerId) {
      orderData.customer_id = customerId
    }

    if (couponCode) {
      orderData.coupon_lines = [{ code: couponCode }]
    }

    const wooOrder = await createWooOrder(orderData)
    
    // Sincronizar con nuestra base de datos local
    await syncOrderToLocalDB(wooOrder)
    
    return wooOrder
  } catch (error) {
    console.error("Error creating order from cart:", error)
    throw error
  }
}

// Sincronizar orden de WooCommerce con nuestra BD local
export async function syncOrderToLocalDB(wooOrder: WooOrder) {
  try {
    // Crear la orden en nuestra BD
    const [localOrder] = await db.insert(orders).values({
      wooOrderId: wooOrder.id,
      userId: wooOrder.customer_id || null,
      status: wooOrder.status,
      total: parseFloat(wooOrder.total),
      subtotal: parseFloat(wooOrder.total) - parseFloat(wooOrder.total_tax),
      tax: parseFloat(wooOrder.total_tax),
      shipping: parseFloat(wooOrder.shipping_total),
      discount: parseFloat(wooOrder.discount_total),
      currency: wooOrder.currency,
      paymentMethod: wooOrder.payment_method,
      paymentStatus: wooOrder.date_paid ? "paid" : "pending",
      orderKey: wooOrder.order_key,
      customerNotes: wooOrder.customer_note || null,
      billingAddress: wooOrder.billing,
      shippingAddress: wooOrder.shipping,
      trackingNumber: null,
      estimatedDelivery: null,
      metadata: {
        woo_order_id: wooOrder.id,
        woo_order_key: wooOrder.order_key
      }
    }).returning()

    // Crear los items de la orden
    for (const lineItem of wooOrder.line_items) {
      await db.insert(orderItems).values({
        orderId: localOrder.id,
        productId: null, // Se puede mapear después si tenemos el producto en nuestra BD
        wooProductId: lineItem.product_id,
        quantity: lineItem.quantity,
        price: parseFloat(lineItem.price.toString()),
        total: parseFloat(lineItem.total),
        metadata: {
          woo_line_item_id: lineItem.id,
          sku: lineItem.sku,
          product_name: lineItem.name,
          variation_id: lineItem.variation_id
        }
      })
    }

    console.log(`✅ Orden ${wooOrder.id} sincronizada a BD local`)
    return localOrder
  } catch (error) {
    console.error("Error syncing order to local DB:", error)
    throw error
  }
}

// Obtener ordenes desde nuestra BD local
export async function getLocalOrders(userId?: string, limit: number = 10) {
  try {
    const ordersQuery = db
      .select()
      .from(orders)
      .orderBy(orders.createdAt)
      .limit(limit)

    if (userId) {
      ordersQuery.where(eq(orders.userId, userId))
    }

    return await ordersQuery
  } catch (error) {
    console.error("Error fetching local orders:", error)
    throw error
  }
}

// Webhook handler para actualizar ordenes
export async function handleOrderWebhook(wooOrder: WooOrder) {
  try {
    // Buscar si la orden ya existe en nuestra BD
    const existingOrder = await db
      .select()
      .from(orders)
      .where(eq(orders.wooOrderId, wooOrder.id))
      .limit(1)

    if (existingOrder.length > 0) {
      // Actualizar orden existente
      await db
        .update(orders)
        .set({
          status: wooOrder.status,
          total: parseFloat(wooOrder.total),
          paymentStatus: wooOrder.date_paid ? "paid" : "pending",
          updatedAt: new Date()
        })
        .where(eq(orders.id, existingOrder[0].id))
    } else {
      // Crear nueva orden
      await syncOrderToLocalDB(wooOrder)
    }

    console.log(`✅ Webhook procesado para orden ${wooOrder.id}`)
  } catch (error) {
    console.error("Error handling order webhook:", error)
    throw error
  }
}
