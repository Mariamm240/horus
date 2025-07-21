'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  EyeIcon,
  HeartIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  ClockIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const SERVICES = [
  {
    id: 'examen-visual',
    icon: EyeIcon,
    title: 'Examen Visual Completo',
    description: 'Evaluación integral de la salud visual que incluye refracción, presión intraocular y salud de la retina.',
    features: [
      'Medición de agudeza visual',
      'Evaluación de refracción',
      'Presión intraocular',
      'Salud de la retina'
    ],
    duration: '45 minutos',
    price: '$80.000',
    popular: true
  },
  {
    id: 'adaptacion-lentes',
    icon: UserGroupIcon,
    title: 'Adaptación de Lentes de Contacto',
    description: 'Servicio especializado para adaptar lentes de contacto según las necesidades específicas de cada paciente.',
    features: [
      'Evaluación de la córnea',
      'Prueba de diferentes materiales',
      'Entrenamiento de uso',
      'Seguimiento personalizado'
    ],
    duration: '60 minutos',
    price: '$120.000',
    popular: false
  },
  {
    id: 'terapia-visual',
    icon: AcademicCapIcon,
    title: 'Terapia Visual',
    description: 'Tratamientos personalizados para mejorar habilidades visuales y corregir problemas de coordinación ocular.',
    features: [
      'Ejercicios de coordinación',
      'Mejora de habilidades visuales',
      'Corrección de problemas binoculares',
      'Seguimiento personalizado'
    ],
    duration: '60 minutos',
    price: '$150.000',
    popular: false
  },
  {
    id: 'deteccion-patologias',
    icon: EyeIcon,
    title: 'Detección de Patologías Oculares',
    description: 'Examen especializado para detectar enfermedades como glaucoma, cataratas y degeneración macular.',
    features: [
      'Detección de glaucoma',
      'Evaluación de cataratas',
      'Degeneración macular',
      'Diagnóstico temprano'
    ],
    duration: '30 minutos',
    price: '$100.000',
    popular: false
  },
  {
    id: 'optometria-pediatrica',
    icon: HeartIcon,
    title: 'Optometría Pediátrica',
    description: 'Evaluación visual especializada para niños, con técnicas adaptadas a sus necesidades.',
    features: [
      'Técnicas adaptadas para niños',
      'Detección temprana de problemas',
      'Ambiente amigable',
      'Seguimiento del desarrollo visual'
    ],
    duration: '45 minutos',
    price: '$90.000',
    popular: true
  },
  {
    id: 'salud-ocular-adultos',
    icon: ClockIcon,
    title: 'Salud Ocular para Adultos Mayores',
    description: 'Atención especializada para personas mayores, enfocada en los cambios visuales relacionados con la edad.',
    features: [
      'Evaluación de cambios por edad',
      'Detección de cataratas',
      'Control de glaucoma',
      'Asesoría especializada'
    ],
    duration: '50 minutos',
    price: '$95.000',
    popular: false
  },
  {
    id: 'asesoria-lentes',
    icon: CheckCircleIcon,
    title: 'Asesoría en Lentes Oftálmicos',
    description: 'Orientación profesional para elegir los lentes más adecuados según prescripción y estilo de vida.',
    features: [
      'Análisis de prescripción',
      'Recomendación de materiales',
      'Asesoría de estilo',
      'Orientación de uso'
    ],
    duration: '30 minutos',
    price: 'Sin costo adicional',
    popular: false
  },
  {
    id: 'control-miopia',
    icon: EyeIcon,
    title: 'Control de Miopía',
    description: 'Programa especializado para controlar la progresión de la miopía, especialmente en niños y adolescentes.',
    features: [
      'Evaluación de progresión',
      'Tratamientos especializados',
      'Seguimiento continuo',
      'Prevención de complicaciones'
    ],
    duration: '45 minutos',
    price: '$200.000',
    popular: true
  }
]

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Agenda tu cita',
    description: 'Reserva tu cita online o por teléfono'
  },
  {
    step: 2,
    title: 'Evaluación inicial',
    description: 'Realizamos una evaluación completa de tus necesidades'
  },
  {
    step: 3,
    title: 'Servicio personalizado',
    description: 'Recibe atención especializada según tu caso'
  },
  {
    step: 4,
    title: 'Seguimiento',
    description: 'Te acompañamos en el proceso de adaptación'
  }
]

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Nuestros Servicios
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Cuidamos tu salud visual con servicios profesionales y tecnología de vanguardia. 
              Nuestro equipo de optómetristas está aquí para brindarte la mejor atención.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios Profesionales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En Horus Optic ofrecemos servicios de optometría de alta calidad con tecnología avanzada y profesionales altamente calificados para cuidar la salud visual de toda su familia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {service.description}
                      </p>
                      
                      <div className="space-y-1 mb-4">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircleIcon className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center space-x-1 text-gray-500">
                          <ClockIcon className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                        <span className="font-bold text-purple-600">{service.price}</span>
                      </div>
                      
                      <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 text-sm font-semibold"
                      >
                        Agendar Cita
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Horus Optic?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos distinguimos por ofrecer atención personalizada y soluciones visuales de alta calidad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Profesionales Certificados
              </h3>
              <p className="text-gray-600">
                Equipo de optómetras con amplia experiencia y certificaciones
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <WrenchScrewdriverIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tecnología Avanzada
              </h3>
              <p className="text-gray-600">
                Equipos de última generación para diagnósticos precisos
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Atención Personalizada
              </h3>
              <p className="text-gray-600">
                Tratamientos adaptados a las necesidades de cada paciente
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Garantía de Calidad
              </h3>
              <p className="text-gray-600">
                Comprometidos con la excelencia en cada servicio
              </p>
            </motion.div>
          </div>
          
          {/* Process Steps */}
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Nuestro Proceso
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experiencia fluida y profesional desde la primera cita
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experiencias reales de quienes han confiado en nuestros servicios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "El examen visual fue muy completo y el optómetra me explicó detalladamente mi condición. Excelente servicio."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Carolina Ramírez</p>
                <p className="text-sm text-gray-500">Bogotá</p>
                <p className="text-sm text-purple-600 mt-1">Servicio: Examen Visual Completo</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "La terapia visual ha mejorado significativamente mi problema de convergencia. Muy profesionales."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Andrés Martínez</p>
                <p className="text-sm text-gray-500">Medellín</p>
                <p className="text-sm text-purple-600 mt-1">Servicio: Terapia Visual</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Mi hijo de 6 años fue atendido en optometría pediátrica. El trato fue excelente y muy paciente."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Valentina Gómez</p>
                <p className="text-sm text-gray-500">Cali</p>
                <p className="text-sm text-purple-600 mt-1">Servicio: Optometría Pediátrica</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Respuestas a las dudas más comunes sobre nuestros servicios
            </p>
          </div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Con qué frecuencia debo realizarme un examen visual?
              </h3>
              <p className="text-gray-600">
                Se recomienda realizar un examen visual completo una vez al año. Sin embargo, si tienes condiciones específicas o usas lentes correctivos, tu optómetra puede recomendarte revisiones más frecuentes.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Qué incluye el examen visual completo?
              </h3>
              <p className="text-gray-600">
                Nuestro examen visual completo incluye evaluación de agudeza visual, refracción, presión intraocular, salud de la retina, evaluación de la coordinación ocular y detección temprana de patologías.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Desde qué edad se recomienda realizar exámenes visuales?
              </h3>
              <p className="text-gray-600">
                Recomendamos realizar el primer examen visual a los 6 meses de edad, luego a los 3 años y antes de iniciar la etapa escolar. Posteriormente, se recomienda un examen anual.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ¿Cuánto tiempo toma adaptarse a nuevos lentes?
              </h3>
              <p className="text-gray-600">
                El período de adaptación varía según cada persona y el tipo de lentes. Generalmente toma entre 1 y 2 semanas adaptarse completamente a una nueva prescripción.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para cuidar tu salud visual?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Agenda una cita con nuestros profesionales y descubre la diferencia de un servicio de optometría de calidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-300"
            >
              Agendar Cita
            </Link>
            <Link
              href="tel:+573001234567"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300 flex items-center justify-center"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Llamar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}