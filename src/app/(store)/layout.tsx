import Link from "next/link"

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-secondary/10 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-gradient-to-r from-primary to-accent"></div>
                <span className="text-lg font-bold text-text-base">Horus Optic</span>
              </div>
              <p className="text-sm text-secondary">
                Óptica premium especializada en lentes de contacto y suscripciones personalizadas.
              </p>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-base">Productos</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li><Link href="/shop" className="hover:text-primary transition-colors">Lentes Diarios</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Lentes Mensuales</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Lentes Especiales</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Suscripciones</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-base">Soporte</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li><Link href="/" className="hover:text-primary transition-colors">Centro de Ayuda</Link></li>
                <li><Link href="/" className="hover:text-primary transition-colors">Envíos y Devoluciones</Link></li>
                <li><Link href="/" className="hover:text-primary transition-colors">Garantía</Link></li>
                <li><Link href="/" className="hover:text-primary transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-base">Legal</h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li><Link href="/" className="hover:text-primary transition-colors">Términos de Servicio</Link></li>
                <li><Link href="/" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
                <li><Link href="/" className="hover:text-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-secondary/10">
            <p className="text-center text-sm text-secondary">
              © 2025 Horus Optic. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
