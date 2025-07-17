# Horus Optic 👁️

Plataforma e-commerce premium para la venta de lentes de contacto y suscripciones, integrada con WooCommerce como backend headless.

## 🚀 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4.1
- **Backend**: WooCommerce (Headless)
- **Base de datos**: PostgreSQL + Drizzle ORM
- **Autenticación**: NextAuth.js v5
- **Pagos**: Stripe Checkout
- **Caché**: SWR para datos de WooCommerce
- **Analytics**: Google Tag Manager
- **UI Components**: HeadlessUI + Heroicons + Lucide React

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint

# Formatear código
npm run format
```

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Primary**: `#B892D5` - Púrpura principal
- **Secondary**: `#9C989F` - Gris neutro
- **Accent**: `#E29AEE` - Púrpura claro de acento
- **Neutral**: `#FFFFFF` - Blanco
- **Text Base**: `#1E1E1E` - Gris oscuro para texto

### Tipografía

- **Fuente Principal**: Inter Variable (Google Fonts)
- **Fallbacks**: system-ui, sans-serif

## 🧩 Componentes UI

### Componentes Disponibles

- `Button` - Botones con variantes (default, secondary, accent, outline, ghost, link)
- `Input` - Campos de entrada con validación
- `Card` - Tarjetas con header, content y footer
- `Badge` - Etiquetas de estado y categorías
- `Dialog` - Modales y diálogos
- `Tabs` - Navegación por pestañas

### Uso de Componentes

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Ejemplo de uso
<Button variant="primary" size="lg">
  Mi Botón
</Button>

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Contenido de la tarjeta
  </CardContent>
</Card>
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (store)/          # Grupo de rutas de la tienda
│   │   ├── layout.tsx    # Layout con header y footer
│   │   ├── page.tsx      # Página principal
│   │   ├── shop/         # Tienda de productos
│   │   ├── checkout/     # Proceso de compra
│   │   └── auth/         # Autenticación
├── components/
│   └── ui/               # Componentes UI reutilizables
├── lib/
│   ├── utils.ts          # Utilidades (cn, clsx, etc.)
│   └── tailwind-colors.ts # Definición de colores
└── styles/
    └── globals.css       # Estilos globales
```

## 🔧 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4.1
- **Componentes UI**: Headless UI + componentes personalizados
- **Iconos**: Heroicons + Lucide React
- **Utilidades**: clsx, tailwind-merge, class-variance-authority

## 🛍️ Funcionalidades

### Características Principales

- ✅ Catálogo de lentes de contacto
- ✅ Sistema de suscripciones
- ✅ Carrito de compras
- ✅ Autenticación de usuarios
- ✅ Proceso de checkout
- ✅ Diseño responsivo
- ✅ Transiciones suaves

### Páginas Implementadas

- **Home** (`/`) - Página principal con hero, planes y testimonios
- **Tienda** (`/shop`) - Catálogo con filtros por marca y frecuencia
- **Producto** (`/shop/[slug]`) - Detalles del producto con selector de planes
- **Checkout** (`/checkout`) - Proceso de compra completo
- **Login** (`/auth/login`) - Inicio de sesión
- **Registro** (`/auth/register`) - Creación de cuenta

## 🎯 Características de UX/UI

- **Diseño Moderno**: Interfaz limpia y profesional
- **Responsive**: Optimizado para móvil, tablet y desktop
- **Accesibilidad**: Componentes accesibles con Headless UI
- **Performance**: Optimizado con Next.js 14
- **Transiciones**: Animaciones suaves con Tailwind CSS

## 🔮 Próximas Funcionalidades

- [ ] Dashboard de usuario
- [ ] Gestión de suscripciones
- [ ] Sistema de notificaciones
- [ ] Integración con pasarelas de pago
- [ ] Panel de administración
- [ ] API backend
- [ ] Base de datos
- [ ] Tests automatizados

## 📝 Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Compilación optimizada
npm run build

# Servidor de producción
npm start

# Verificación de código
npm run lint

# Formateo de código con Prettier
npm run format

# Verificación de tipos TypeScript
npm run type-check
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Horus Optic** - Visión perfecta, comodidad total ✨
