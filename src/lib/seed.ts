import { db } from "@/lib/db/db"
import { products } from "@/lib/schema"

const sampleProducts = [
  {
    name: "Acuvue Oasys",
    slug: "acuvue-oasys",
    brand: "Acuvue",
    description: "Lentes de contacto blandas de hidrogel de silicona para uso diario. Máximo confort durante todo el día con tecnología HydraLuxe.",
    price: "45.99",
    subscriptionPrice: "39.99",
    frequency: "bi-weekly",
    material: "Senofilcon A",
    waterContent: "38%",
    oxygenTransmission: "147 Dk/t",
    uvProtection: true,
    centerThickness: "0.07mm",
    stock: 150,
    images: ["/products/acuvue-oasys-1.jpg", "/products/acuvue-oasys-2.jpg"],
    features: ["Tecnología HydraLuxe", "Protección UV", "Confort todo el día"],
    specifications: {
      "diameter": "14.3mm",
      "baseCurve": "8.4mm",
      "power": "-2.25",
      "packageQuantity": 6
    },
    rating: "4.8",
    reviewCount: 245
  },
  {
    name: "Biofinity",
    slug: "biofinity",
    brand: "CooperVision",
    description: "Lentes de contacto mensuales de hidrogel de silicona Aquaform. Comodidad natural que dura todo el mes.",
    price: "32.99",
    subscriptionPrice: "28.99",
    frequency: "monthly",
    material: "Comfilcon A",
    waterContent: "48%",
    oxygenTransmission: "160 Dk/t",
    uvProtection: false,
    centerThickness: "0.08mm",
    stock: 200,
    images: ["/products/biofinity-1.jpg", "/products/biofinity-2.jpg"],
    features: ["Aquaform Technology", "Comodidad natural", "Uso mensual"],
    specifications: {
      "diameter": "14.0mm",
      "baseCurve": "8.6mm",
      "power": "-1.50",
      "packageQuantity": 6
    },
    rating: "4.6",
    reviewCount: 189
  },
  {
    name: "Dailies Total 1",
    slug: "dailies-total-1",
    brand: "Alcon",
    description: "Las primeras y únicas lentes de contacto diarias con gradiente de agua. Comfort superior desde el primer uso.",
    price: "58.99",
    subscriptionPrice: "52.99",
    frequency: "daily",
    material: "Delefilcon A",
    waterContent: "80%",
    oxygenTransmission: "156 Dk/t",
    uvProtection: false,
    centerThickness: "0.09mm",
    stock: 120,
    images: ["/products/dailies-total-1.jpg", "/products/dailies-total-2.jpg"],
    features: ["Gradiente de agua", "Comfort superior", "Uso diario"],
    specifications: {
      "diameter": "14.1mm",
      "baseCurve": "8.5mm",
      "power": "-3.00",
      "packageQuantity": 30
    },
    rating: "4.9",
    reviewCount: 312
  },
  {
    name: "Air Optix Night & Day",
    slug: "air-optix-night-day",
    brand: "Alcon",
    description: "Lentes de contacto de uso continuo. Úsalas hasta 30 noches y días seguidos con la aprobación de tu especialista.",
    price: "42.99",
    subscriptionPrice: "37.99",
    frequency: "monthly",
    material: "Lotrafilcon A",
    waterContent: "24%",
    oxygenTransmission: "175 Dk/t",
    uvProtection: false,
    centerThickness: "0.08mm",
    stock: 90,
    images: ["/products/air-optix-1.jpg", "/products/air-optix-2.jpg"],
    features: ["Uso continuo", "Alta transmisión de oxígeno", "30 días"],
    specifications: {
      "diameter": "13.8mm",
      "baseCurve": "8.6mm",
      "power": "-4.25",
      "packageQuantity": 6
    },
    rating: "4.4",
    reviewCount: 156
  },
  {
    name: "1-Day Acuvue Moist",
    slug: "1-day-acuvue-moist",
    brand: "Acuvue",
    description: "Lentes de contacto diarias con tecnología LACREON que bloquea los rayos UV dañinos.",
    price: "35.99",
    subscriptionPrice: "31.99",
    frequency: "daily",
    material: "Etafilcon A",
    waterContent: "58%",
    oxygenTransmission: "25 Dk/t",
    uvProtection: true,
    centerThickness: "0.084mm",
    stock: 160,
    images: ["/products/acuvue-moist-1.jpg", "/products/acuvue-moist-2.jpg"],
    features: ["Tecnología LACREON", "Protección UV", "Uso diario"],
    specifications: {
      "diameter": "14.2mm",
      "baseCurve": "8.5mm",
      "power": "-2.00",
      "packageQuantity": 30
    },
    rating: "4.5",
    reviewCount: 203
  }
]

export async function seedProducts() {
  try {
    console.log("🌱 Iniciando seeding de productos...")
    
    for (const product of sampleProducts) {
      await db.insert(products).values(product)
      console.log(`✅ Producto creado: ${product.name}`)
    }
    
    console.log(`🎉 Seeding completado! ${sampleProducts.length} productos creados.`)
    
  } catch (error) {
    console.error("❌ Error durante el seeding:", error)
    throw error
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedProducts()
    .then(() => {
      console.log("✨ Seeding finalizado exitosamente")
      process.exit(0)
    })
    .catch((error) => {
      console.error("💥 Error en el seeding:", error)
      process.exit(1)
    })
}
