import { syncProductsFromWooCommerce } from "./wooProducts"

async function main() {
  try {
    const args = process.argv.slice(2)
    const syncAll = args.includes('--all')
    
    console.log('🔄 Iniciando sincronización con WooCommerce...')
    
    const limit = syncAll ? 1000 : 100
    const synced = await syncProductsFromWooCommerce(limit)
    
    console.log(`✅ Sincronización completada: ${synced} productos actualizados`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error en la sincronización:', error)
    process.exit(1)
  }
}

main()
