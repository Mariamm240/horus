import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

if (!process.env.WOO_CONSUMER_KEY || !process.env.WOO_CONSUMER_SECRET || !process.env.WOO_STORE_URL) {
  throw new Error("WooCommerce credentials are required")
}

const wooClient = new WooCommerceRestApi({
  url: process.env.WOO_STORE_URL,
  consumerKey: process.env.WOO_CONSUMER_KEY,
  consumerSecret: process.env.WOO_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: true
})

export default wooClient

// Types para WooCommerce
export interface WooProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  low_stock_amount: number | null
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  images: Array<{
    id: number
    date_created: string
    date_modified: string
    src: string
    name: string
    alt: string
  }>
  attributes: Array<{
    id: number
    name: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
  }>
  default_attributes: any[]
  variations: any[]
  grouped_products: any[]
  menu_order: number
  price_html: string
  related_ids: number[]
  meta_data: Array<{
    id: number
    key: string
    value: any
  }>
  stock_status: string
}

export interface WooOrder {
  id: number
  parent_id: number
  status: string
  currency: string
  version: string
  prices_include_tax: boolean
  date_created: string
  date_modified: string
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  customer_id: number
  order_key: string
  billing: WooAddress
  shipping: WooAddress
  payment_method: string
  payment_method_title: string
  transaction_id: string
  customer_ip_address: string
  customer_user_agent: string
  created_via: string
  customer_note: string
  date_completed: string | null
  date_paid: string | null
  cart_hash: string
  number: string
  meta_data: Array<{
    id: number
    key: string
    value: any
  }>
  line_items: Array<{
    id: number
    name: string
    product_id: number
    variation_id: number
    quantity: number
    tax_class: string
    subtotal: string
    subtotal_tax: string
    total: string
    total_tax: string
    taxes: any[]
    meta_data: any[]
    sku: string
    price: number
    image: {
      id: string
      src: string
    }
    parent_name: string | null
  }>
  tax_lines: any[]
  shipping_lines: any[]
  fee_lines: any[]
  coupon_lines: Array<{
    id: number
    code: string
    discount: string
    discount_tax: string
    meta_data: any[]
  }>
  refunds: any[]
  payment_url: string
  currency_symbol: string
}

export interface WooAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone?: string
}

export interface WooCoupon {
  id: number
  code: string
  amount: string
  date_created: string
  date_created_gmt: string
  date_modified: string
  date_modified_gmt: string
  discount_type: string
  description: string
  date_expires: string | null
  date_expires_gmt: string | null
  usage_count: number
  individual_use: boolean
  product_ids: number[]
  excluded_product_ids: number[]
  usage_limit: number | null
  usage_limit_per_user: number | null
  limit_usage_to_x_items: number | null
  free_shipping: boolean
  product_categories: number[]
  excluded_product_categories: number[]
  exclude_sale_items: boolean
  minimum_amount: string
  maximum_amount: string
  email_restrictions: string[]
  used_by: string[]
  meta_data: any[]
}
