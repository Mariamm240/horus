import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  TruckIcon,
  ClockIcon,
  CogIcon
} from "@heroicons/react/24/outline"

export default async function AccountPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/login")
  }

  const user = session.user

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Cuenta</h1>
        <p className="text-gray-600">Gestiona tu información personal y pedidos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <UserIcon className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <Badge variant="outline" className="mt-2">
                Cliente Premium
              </Badge>
            </div>

            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <UserIcon className="w-4 h-4 mr-2" />
                Información Personal
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <TruckIcon className="w-4 h-4 mr-2" />
                Mis Pedidos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCardIcon className="w-4 h-4 mr-2" />
                Suscripciones
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MapPinIcon className="w-4 h-4 mr-2" />
                Direcciones
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CogIcon className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información Personal */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Información Personal</h3>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user.name || "No especificado"}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{user.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">+34 600 000 000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Registro
                </label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <ClockIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">Enero 2024</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Pedidos Recientes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Pedidos Recientes</h3>
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </div>

            <div className="space-y-4">
              {/* Pedido 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">#ORD-2024-001</p>
                    <p className="text-sm text-gray-500">15 de Enero, 2024</p>
                  </div>
                  <Badge variant="default">Entregado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Acuvue Oasys - 6 lentes</p>
                  <p className="font-medium text-gray-900">€45.99</p>
                </div>
              </div>

              {/* Pedido 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">#ORD-2024-002</p>
                    <p className="text-sm text-gray-500">8 de Enero, 2024</p>
                  </div>
                  <Badge variant="secondary">En tránsito</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Biofinity - 3 meses</p>
                  <p className="font-medium text-gray-900">€89.99</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Suscripciones Activas */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Suscripciones Activas</h3>
              <Button variant="outline" size="sm">
                Gestionar
              </Button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-purple-900">Plan Mensual Premium</h4>
                  <p className="text-purple-700">Acuvue Oasys - Entrega mensual</p>
                </div>
                <Badge className="bg-purple-600">Activa</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Próxima entrega: 25 de Enero</p>
                  <p className="text-lg font-bold text-purple-900">€29.99/mes</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Pausar
                  </Button>
                  <Button variant="outline" size="sm">
                    Modificar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
