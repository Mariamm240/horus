import wooClient, { WooProduct } from "./wooClient"
import { db } from "../db/db"
import { products } from "../schema"
import { eq } from "drizzle-orm"

export interface ProductsQuery {
  page?: number
  per_page?: number
  search?: string
  category?: string
  tag?: string
  featured?: boolean
  on_sale?: boolean
  min_price?: string
  max_price?: string
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'price' | 'popularity' | 'rating'
  order?: 'asc' | 'desc'
  status?: 'draft' | 'pending' | 'private' | 'publish'
}

export async function getWooProducts(params: ProductsQuery = {}) {
  try {
    const {
      page = 1,
      per_page = 20,
      search,
      category,
      tag,
      featured,
      on_sale,
      min_price,
      max_price,
      orderby = 'date',
      order = 'desc',
      status = 'publish'
    } = params

    const queryParams: Record<string, any> = {
      page,
      per_page,
      orderby,
      order,
      status
    }

    if (search) queryParams.search = search
    if (category) queryParams.category = category
    if (tag) queryParams.tag = tag
    if (featured !== undefined) queryParams.featured = featured
    if (on_sale !== undefined) queryParams.on_sale = on_sale
    if (min_price) queryParams.min_price = min_price
    if (max_price) queryParams.max_price = max_price

    const response = await wooClient.get("products", queryParams)
    
    return {
      products: response.data as WooProduct[],
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0')
    }
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error)
    throw new Error("Failed to fetch products from WooCommerce")
  }
}

export async function getWooProductBySlug(slug: string): Promise<WooProduct | null> {
  try {
    const response = await wooClient.get("products", { slug })
    const products = response.data as WooProduct[]
    
    return products.length > 0 ? products[0] : null
  } catch (error) {
    console.error("Error fetching WooCommerce product by slug:", error)
    return null
  }
}

export async function getWooProductById(id: number): Promise<WooProduct | null> {
  try {
    const response = await wooClient.get(`products/${id}`)
    return response.data as WooProduct
  } catch (error) {
    console.error("Error fetching WooCommerce product by ID:", error)
    return null
  }
}

export async function getRelatedProducts(productId: number, limit: number = 4): Promise<WooProduct[]> {
  try {
    const product = await getWooProductById(productId)
    if (!product || !product.related_ids.length) {
      return []
    }

    const relatedIds = product.related_ids.slice(0, limit)
    const relatedProducts = await Promise.all(
      relatedIds.map(id => getWooProductById(id))
    )

    return relatedProducts.filter(Boolean) as WooProduct[]
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export async function getCrossSellProducts(productId: number): Promise<WooProduct[]> {
  try {
    const product = await getWooProductById(productId)
    if (!product || !product.cross_sell_ids.length) {
      return []
    }

    const crossSellProducts = await Promise.all(
      product.cross_sell_ids.map(id => getWooProductById(id))
    )

    return crossSellProducts.filter(Boolean) as WooProduct[]
  } catch (error) {
    console.error("Error fetching cross-sell products:", error)
    return []
  }
}

export async function getUpsellProducts(productId: number): Promise<WooProduct[]> {
  try {
    const product = await getWooProductById(productId)
    if (!product || !product.upsell_ids.length) {
      return []
    }

    const upsellProducts = await Promise.all(
      product.upsell_ids.map(id => getWooProductById(id))
    )

    return upsellProducts.filter(Boolean) as WooProduct[]
  } catch (error) {
    console.error("Error fetching upsell products:", error)
    return []
  }
}

// Sincronizar productos de WooCommerce con nuestra base de datos
export async function syncProductsFromWooCommerce(limit: number = 100) {
  try {
    console.log("🔄 Sincronizando productos desde WooCommerce...")
    
    let page = 1
    let hasMore = true
    let totalSynced = 0

    while (hasMore && totalSynced < limit) {
      const { products: wooProducts, totalPages } = await getWooProducts({
        page,
        per_page: 20,
        status: 'publish'
      })

      for (const wooProduct of wooProducts) {
        if (totalSynced >= limit) break

        try {
          // Buscar si el producto ya existe en nuestra BD
          const existingProduct = await db
            .select()
            .from(products)
            .where(eq(products.slug, wooProduct.slug))
            .limit(1)

          const productData = {
            slug: wooProduct.slug,
            name: wooProduct.name,
            brand: wooProduct.categories[0]?.name || "Sin marca",
            description: wooProduct.description || wooProduct.short_description,
            price: wooProduct.price || "0",
            subscriptionPrice: wooProduct.sale_price || wooProduct.price || "0",
            frequency: getFrequencyFromProduct(wooProduct),
            material: getMetaValue(wooProduct, 'material') || "N/A",
            waterContent: getMetaValue(wooProduct, 'water_content') || "N/A",
            oxygenTransmission: getMetaValue(wooProduct, 'oxygen_transmission') || "N/A",
            uvProtection: getMetaValue(wooProduct, 'uv_protection') === 'yes',
            centerThickness: getMetaValue(wooProduct, 'center_thickness') || "N/A",
            stock: wooProduct.stock_quantity || 0,
            images: wooProduct.images.map(img => img.src),
            features: wooProduct.tags.map(tag => tag.name),
            specifications: {
              sku: wooProduct.sku,
              weight: wooProduct.weight,
              dimensions: wooProduct.dimensions,
              categories: wooProduct.categories.map(cat => cat.name),
              woo_id: wooProduct.id
            },
            rating: wooProduct.average_rating || "0",
            reviewCount: wooProduct.rating_count || 0
          }

          if (existingProduct.length > 0) {
            // Actualizar producto existente
            await db
              .update(products)
              .set(productData)
              .where(eq(products.id, existingProduct[0].id))
          } else {
            // Crear nuevo producto
            await db.insert(products).values(productData)
          }

          totalSynced++
          console.log(`✅ Producto sincronizado: ${wooProduct.name}`)
        } catch (error) {
          console.error(`❌ Error sincronizando producto ${wooProduct.name}:`, error)
        }
      }

      hasMore = page < totalPages
      page++
    }

    console.log(`🎉 Sincronización completada! ${totalSynced} productos sincronizados.`)
    return totalSynced
  } catch (error) {
    console.error("❌ Error en la sincronización:", error)
    throw error
  }
}

// Helper para obtener valores de meta_data
function getMetaValue(product: WooProduct, key: string): string | null {
  const metaItem = product.meta_data.find(meta => meta.key === key)
  return metaItem ? String(metaItem.value) : null
}

// Helper para determinar frecuencia del producto
function getFrequencyFromProduct(product: WooProduct): string {
  const name = product.name.toLowerCase()
  const description = (product.description + product.short_description).toLowerCase()
  
  if (name.includes('daily') || name.includes('diaria') || description.includes('diaria')) {
    return 'daily'
  } else if (name.includes('weekly') || name.includes('semanal') || description.includes('semanal')) {
    return 'weekly'
  } else if (name.includes('monthly') || name.includes('mensual') || description.includes('mensual')) {
    return 'monthly'
  } else if (name.includes('quarterly') || name.includes('trimestral') || description.includes('trimestral')) {
    return 'quarterly'
  }
  
  return 'monthly' // default
}
