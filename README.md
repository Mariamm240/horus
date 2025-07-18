# Horus Optic 👁️

Plataforma e-commerce premium para la venta de lentes de contacto y suscripciones, con diseño moderno y experiencia de usuario excepcional.

## ✨ Características

- 🎨 **Diseño Premium**: UI moderna con gradientes púrpura y componentes elegantes
- 📱 **Responsive**: Optimizado para móvil, tablet y desktop
- 🛒 **E-commerce Completo**: Carrito, checkout, gestión de productos
- 👤 **Autenticación**: Login/registro con OAuth Google
- 📧 **Formularios Avanzados**: Validación con Zod y React Hook Form
- 🔔 **Notificaciones**: Sistema de toast con Sonner
- 🎭 **Animaciones**: Transiciones suaves con Framer Motion
- 📊 **SEO Optimizado**: Metadatos completos y estructura semántica

## 🚀 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4.1
- **Backend**: WooCommerce (Headless)
- **Base de datos**: PostgreSQL + Drizzle ORM
- **Autenticación**: NextAuth.js v5
- **Pagos**: Stripe Checkout
- **Formularios**: React Hook Form + Zod
- **Animaciones**: Framer Motion
- **Notificaciones**: Sonner
- **Caché**: SWR para datos de WooCommerce
- **Analytics**: Google Tag Manager
- **UI Components**: HeadlessUI + Lucide React

## 🛠️ Comandos de Desarrollo

```bash
# Instalación de dependencias
npm install

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

# Verificar tipos TypeScript
npm run type-check

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
├── app/                          # App Router (Next.js 14)
│   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   ├── login/                # Página de inicio de sesión
│   │   └── register/             # Página de registro
│   ├── (store)/                  # Grupo de rutas de la tienda
│   │   ├── lentes-de-contacto/   # Catálogo de productos
│   │   ├── servicios/            # Servicios ofrecidos
│   │   ├── sobre-nosotros/       # Página about
│   │   ├── contacto/             # Formulario de contacto
│   │   └── carrito/              # Carrito de compras
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página de inicio
│   └── not-found.tsx             # Página 404 personalizada
├── components/                   # Componentes React
│   ├── layout/                   # Componentes de layout
│   │   ├── header.tsx            # Header con navegación
│   │   └── footer.tsx            # Footer con links y newsletter
│   └── ui/                       # Componentes UI reutilizables
│       ├── hero-section.tsx      # Sección hero con gradiente
│       ├── product-grid.tsx      # Grid de productos
│       ├── section-wrapper.tsx   # Wrapper con padding estándar
│       ├── mobile-nav.tsx        # Navegación móvil
│       └── sonner-toaster.tsx    # Notificaciones toast
├── lib/                          # Utilidades y configuración
│   ├── utils.ts                  # Utilidades generales
│   └── validations.ts            # Esquemas de validación Zod
└── middleware.ts                 # Middleware de autenticación

```

## 🚀 Guía de Desarrollo

### Añadir Nueva Página

1. **Crear el archivo de página**:
   ```bash
   # Para páginas públicas (tienda)
   src/app/(store)/nueva-pagina/page.tsx
   
   # Para páginas de autenticación
   src/app/(auth)/nueva-auth/page.tsx
   ```

2. **Estructura básica de página**:
   ```tsx
   import type { Metadata } from "next"
   import { HeroSection } from "@/components/ui/hero-section"
   import { SectionWrapper } from "@/components/ui/section-wrapper"

   export const metadata: Metadata = {
     title: "Título de la Página | Horus Optic",
     description: "Descripción SEO de la página"
   }

   export default function NuevaPagina() {
     return (
       <div className="min-h-screen bg-white">
         <HeroSection
           title="Título Principal"
           description="Descripción del hero"
         />
         <SectionWrapper>
           {/* Contenido de la página */}
         </SectionWrapper>
       </div>
     )
   }
   ```

3. **Añadir al header**: Actualizar el array `navigation` en `src/components/layout/header.tsx`

### Crear Componente UI

1. **Crear archivo en `src/components/ui/`**:
   ```tsx
   import { ReactNode } from "react"
   import { cn } from "@/lib/utils"

   interface MiComponenteProps {
     children: ReactNode
     className?: string
     variant?: "default" | "primary" | "secondary"
   }

   export function MiComponente({ 
     children, 
     className, 
     variant = "default" 
   }: MiComponenteProps) {
     return (
       <div className={cn(
         "base-styles",
         variant === "primary" && "primary-styles",
         variant === "secondary" && "secondary-styles",
         className
       )}>
         {children}
       </div>
     )
   }
   ```

2. **Usar clases de Tailwind consistentes**:
   - Gradientes: `bg-gradient-to-br from-purple-500 to-purple-700`
   - Sombras: `shadow-sm`, `shadow-md`, `shadow-lg`
   - Radius: `rounded-lg`, `rounded-xl`, `rounded-2xl`
   - Transiciones: `transition-colors duration-200`

### Formularios con Validación

1. **Crear esquema Zod** en `src/lib/validations.ts`:
   ```tsx
   export const miFormSchema = z.object({
     campo: z.string().min(1, "Campo requerido")
   })
   
   export type MiFormData = z.infer<typeof miFormSchema>
   ```

2. **Implementar formulario**:
   ```tsx
   "use client"
   
   import { useForm } from "react-hook-form"
   import { zodResolver } from "@hookform/resolvers/zod"
   import { miFormSchema, type MiFormData } from "@/lib/validations"
   
   export function MiFormulario() {
     const { register, handleSubmit, formState: { errors } } = useForm<MiFormData>({
       resolver: zodResolver(miFormSchema)
     })
   
     const onSubmit = async (data: MiFormData) => {
       // Lógica de envío
     }
   
     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         {/* Campos del formulario */}
       </form>
     )
   }
   ```

## 🎨 Guía de Estilos

### Paleta de Colores Extendida

```css
/* Variables CSS personalizadas */
:root {
  --color-primary: #B892D5;      /* Púrpura principal */
  --color-accent: #E29AEE;       /* Púrpura claro */
  --color-neutral: #9C989F;      /* Gris neutro */
  --color-success: #10B981;      /* Verde éxito */
  --color-warning: #F59E0B;      /* Amarillo advertencia */
  --color-error: #EF4444;        /* Rojo error */
  --color-background: #FFFFFF;   /* Fondo blanco */
  --color-foreground: #1E1E1E;   /* Texto principal */
}
```

### Espaciado Estándar

- **Padding interno**: `p-4`, `p-6`, `p-8`
- **Márgenes**: `mb-4`, `mb-6`, `mb-8`, `mb-12`, `mb-16`
- **Gaps**: `gap-4`, `gap-6`, `gap-8`
- **Contenedores**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Breakpoints Responsive

- **sm**: 640px (tablets pequeñas)
- **md**: 768px (tablets)
- **lg**: 1024px (desktop pequeño)
- **xl**: 1280px (desktop)
- **2xl**: 1536px (desktop grande)

## 🔧 Configuración de Entorno

### Variables de Entorno (.env.local)

```bash
# Base
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-super-seguro

# Database
DATABASE_URL="postgresql://usuario:password@localhost:5432/horus_optic"

# WooCommerce
WOOCOMMERCE_URL=https://tu-tienda.com
WOOCOMMERCE_CONSUMER_KEY=ck_...
WOOCOMMERCE_CONSUMER_SECRET=cs_...

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# EmailJS (opcional)
EMAILJS_SERVICE_ID=service_...
EMAILJS_TEMPLATE_ID=template_...
EMAILJS_PUBLIC_KEY=...
```

## 📱 PWA y Performance

### Optimizaciones Implementadas

- **Images**: Componente `next/image` con lazy loading
- **Fonts**: Google Fonts con display swap
- **Bundle**: Eliminación automática de console.logs en producción
- **Security**: Headers de seguridad configurados
- **SEO**: Metadatos completos y structured data

### Lighthouse Score Objetivo

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático en cada push

### Docker (Alternativo)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Debugging

### Logs de Desarrollo

```bash
# Ver logs en tiempo real
npm run dev

# Verificar build
npm run build
npm run start
```

### Herramientas Útiles

- **React Developer Tools**: Inspección de componentes
- **Next.js Inspector**: Análisis de bundle
- **Lighthouse**: Auditoría de performance
- **axe DevTools**: Análisis de accesibilidad

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'feat: añadir nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Convenciones de Commit

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Cambios de formato
- `refactor:` Refactorización
- `test:` Añadir tests
- `chore:` Tareas de mantenimiento

---

**Desarrollado con ❤️ por el equipo de Horus Optic**
