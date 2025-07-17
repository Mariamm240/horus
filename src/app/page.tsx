import Link from "next/link";
import { EyeIcon, HeartIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Tu visión es
                <span className="block text-accent">nuestra pasión</span>
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Descubre la mejor colección de lentes de contacto premium con suscripciones personalizadas y entrega gratuita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tienda"
                  className="bg-accent hover:bg-accent/90 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center"
                >
                  Explorar Productos
                </Link>
                <Link
                  href="/suscripcion"
                  className="border-2 border-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center"
                >
                  Ver Suscripciones
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-3xl backdrop-blur-sm p-8 flex items-center justify-center">
                <EyeIcon className="w-48 h-48 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Horus Optic?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos la mejor experiencia en lentes de contacto con calidad premium y servicio excepcional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Premium</h3>
              <p className="text-gray-600">Solo trabajamos con las mejores marcas reconocidas mundialmente.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Envío Gratuito</h3>
              <p className="text-gray-600">Entrega gratuita en todo el país en pedidos superiores a $50.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suscripción Flexible</h3>
              <p className="text-gray-600">Recibe tus lentes cuando los necesites con total flexibilidad.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <EyeIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Asesoría Experta</h3>
              <p className="text-gray-600">Nuestros especialistas te ayudan a encontrar los lentes perfectos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Encuentra tus lentes perfectos
            </h2>
            <p className="text-xl text-gray-600">
              Explora nuestra amplia gama de lentes de contacto para cada necesidad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/tienda?categoria=diarios" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-200">
                <h3 className="text-2xl font-bold mb-3">Lentes Diarios</h3>
                <p className="text-blue-100 mb-4">Comodidad y frescura todos los días</p>
                <div className="flex items-center text-blue-100 group-hover:text-white">
                  <span>Explorar →</span>
                </div>
              </div>
            </Link>
            
            <Link href="/tienda?categoria=semanales" className="group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-200">
                <h3 className="text-2xl font-bold mb-3">Lentes Semanales</h3>
                <p className="text-green-100 mb-4">Perfectos para uso regular</p>
                <div className="flex items-center text-green-100 group-hover:text-white">
                  <span>Explorar →</span>
                </div>
              </div>
            </Link>
            
            <Link href="/tienda?categoria=mensuales" className="group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-200">
                <h3 className="text-2xl font-bold mb-3">Lentes Mensuales</h3>
                <p className="text-purple-100 mb-4">La opción más económica y duradera</p>
                <div className="flex items-center text-purple-100 group-hover:text-white">
                  <span>Explorar →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Nunca te quedes sin lentes
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Suscríbete y recibe tus lentes automáticamente cuando los necesites. 
              Sin compromisos, con total flexibilidad para pausar o cambiar tu plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/suscripcion"
                className="bg-accent hover:bg-accent/90 text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Comenzar Suscripción
              </Link>
              <Link
                href="/tienda"
                className="border-2 border-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-white"
              >
                Compra Individual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Mantente informado
            </h2>
            <p className="text-gray-300 mb-8">
              Recibe ofertas exclusivas, consejos de cuidado ocular y novedades directamente en tu email.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
