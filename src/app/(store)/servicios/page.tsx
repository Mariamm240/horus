'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  EyeIcon,
  ClockIcon,
  CheckIcon,
  StarIcon,
  ChevronDownIcon,
  PhoneIcon,
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

// Servicios principales
const SERVICES = [
  {
    id: 'examen-visual',
    title: 'Examen Visual Completo',
    description: 'EvaluaciÃ³n integral de la salud visual que incluye refracciÃ³n, presiÃ³n intraocular y salud de la retina.',
    duration: '45 minutos',
    price: 80000,
    category: 'diagnostico',
    popular: false,
    features: [
      'RefracciÃ³n computerizada',
      'MediciÃ³n de presiÃ³n intraocular',
      'EvaluaciÃ³n de retina',
      'BiomicroscopÃ­a anterior',
      'Recomendaciones personalizadas'
    ],
    icon: EyeIcon,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'adaptacion-lentes',
    title: 'AdaptaciÃ³n de Lentes de Contacto',
    description: 'Servicio especializado para adaptar lentes de contacto segÃºn las necesidades especÃ­ficas de cada paciente.',
    duration: '60 minutos',
    price: 120000,
    category: 'adaptacion',
    popular: false,
    features: [
      'EvaluaciÃ³n de cÃ³rnea',
      'Prueba de diferentes materiales',
      'Entrenamiento de uso',
      'Control y seguimiento',
      'Kit de inicio incluido'
    ],
    icon: UserGroupIcon,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'terapia-visual',
    title: 'Terapia Visual',
    description: 'Tratamientos personalizados para mejorar habilidades visuales y corregir problemas de coordinaciÃ³n ocular.',
    duration: '60 minutos',
    price: 150000,
    category: 'tratamientos',
    popular: false,
    features: [
      'EvaluaciÃ³n de habilidades visuales',
      'Ejercicios personalizados',
      'Seguimiento progresivo',
      'Material de apoyo',
      'Plan de ejercicios en casa'
    ],
    icon: SparklesIcon,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'deteccion-patologias',
    title: 'DetecciÃ³n de PatologÃ­as Oculares',
    description: 'Examen especializado para detectar enfermedades como glaucoma, cataratas y degeneraciÃ³n macular.',
    duration: '30 minutos',
    price: 100000,
    category: 'diagnostico',
    popular: true,
    features: [
      'OCT de retina',
      'Campo visual',
      'FotografÃ­a de fondo de ojo',
      'EvaluaciÃ³n de nervio Ã³ptico',
      'Informe detallado'
    ],
    icon: ShieldCheckIcon,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'optometria-pediatrica',
    title: 'OptometrÃ­a PediÃ¡trica',
    description: 'EvaluaciÃ³n visual especializada para niÃ±os, con tÃ©cnicas adaptadas a sus necesidades.',
    duration: '45 minutos',
    price: 90000,
    category: 'especialidades',
    popular: false,
    features: [
      'TÃ©cnicas especiales para niÃ±os',
      'EvaluaciÃ³n del desarrollo visual',
      'DetecciÃ³n temprana de problemas',
      'OrientaciÃ³n a padres',
      'Seguimiento personalizado'
    ],
    icon: HeartIcon,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'adultos-mayores',
    title: 'Salud Ocular para Adultos Mayores',
    description: 'AtenciÃ³n especializada para personas mayores, enfocada en los cambios visuales relacionados con la edad.',
    duration: '50 minutos',
    price: 95000,
    category: 'especialidades',
    popular: false,
    features: [
      'EvaluaciÃ³n de presbicia',
      'DetecciÃ³n de cataratas',
      'Control de presiÃ³n ocular',
      'EvaluaciÃ³n de retina',
      'Recomendaciones especÃ­ficas'
    ],
    icon: ClockIcon,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'asesoria-lentes',
    title: 'AsesorÃ­a en Lentes OftÃ¡lmicos',
    description: 'OrientaciÃ³n profesional para elegir los lentes mÃ¡s adecuados segÃºn prescripciÃ³n y estilo de vida.',
    duration: '30 minutos',
    price: 0,
    category: 'asesoria',
    popular: true,
    features: [
      'AnÃ¡lisis de necesidades visuales',
      'RecomendaciÃ³n de materiales',
      'SelecciÃ³n de tratamientos',
      'ComparaciÃ³n de opciones',
      'Sin costo adicional'
    ],
    icon: AcademicCapIcon,
    image: '/api/placeholder/400/300'
  },
  {
    id: 'control-miopia',
    title: 'Control de MiopÃ­a',
    description: 'Programa especializado para controlar la progresiÃ³n de la miopÃ­a, especialmente en niÃ±os y adolescentes.',
    duration: '45 minutos',
    price: 200000,
    category: 'tratamientos',
    popular: false,
    features: [
      'EvaluaciÃ³n de progresiÃ³n',
      'Lentes especializados',
      'Terapia visual especÃ­fica',
      'Seguimiento mensual',
      'Plan de control personalizado'
    ],
    icon: EyeIcon,
    image: '/api/placeholder/400/300'
  }
]

const CATEGORIES = [
  { id: 'todos', name: 'Todos los servicios', count: SERVICES.length },
  { id: 'diagnostico', name: 'DiagnÃ³stico', count: SERVICES.filter(s => s.category === 'diagnostico').length },
  { id: 'tratamientos', name: 'Tratamientos', count: SERVICES.filter(s => s.category === 'tratamientos').length },
  { id: 'adaptacion', name: 'AdaptaciÃ³n', count: SERVICES.filter(s => s.category === 'adaptacion').length },
  { id: 'especialidades', name: 'Especialidades', count: SERVICES.filter(s => s.category === 'especialidades').length },
  { id: 'asesoria', name: 'AsesorÃ­a', count: SERVICES.filter(s => s.category === 'asesoria').length }
]

const WHY_CHOOSE_US = [
  {
    icon: AcademicCapIcon,
    title: 'Profesionales Certificados',
    description: 'Equipo de optÃ³metras con amplia experiencia y certificaciones'
  },
  {
    icon: SparklesIcon,
    title: 'TecnologÃ­a Avanzada',
    description: 'Equipos de Ãºltima generaciÃ³n para diagnÃ³sticos precisos'
  },
  {
    icon: HeartIcon,
    title: 'AtenciÃ³n Personalizada',
    description: 'Tratamientos adaptados a las necesidades de cada paciente'
  },
  {
    icon: ShieldCheckIcon,
    title: 'GarantÃ­a de Calidad',
    description: 'Comprometidos con la excelencia en cada servicio'
  }
]

const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Agenda tu Cita',
    description: 'Programa tu consulta en lÃ­nea o por telÃ©fono segÃºn tu disponibilidad'
  },
  {
    step: 2,
    title: 'EvaluaciÃ³n Profesional',
    description: 'Examen completo realizado por nuestros optÃ³metras especializados'
  },
  {
    step: 3,
    title: 'SoluciÃ³n Personalizada',
    description: 'Recomendaciones y tratamientos adaptados a tus necesidades especÃ­ficas'
  }
]

const TESTIMONIALS = [
  {
    name: 'Carolina RamÃ­rez',
    location: 'BogotÃ¡',
    service: 'Examen Visual Completo',
    content: 'El examen visual fue muy completo y el optÃ³metra me explicÃ³ detalladamente mi condiciÃ³n. Excelente servicio.',
    avatar: '/api/placeholder/150/150',
    rating: 5
  },
  {
    name: 'AndrÃ©s MartÃ­nez',
    location: 'MedellÃ­n',
    service: 'Terapia Visual',
    content: 'La terapia visual ha mejorado significativamente mi problema de convergencia. Muy profesionales.',
    avatar: '/api/placeholder/150/150',
    rating: 5
  },
  {
    name: 'Valentina GÃ³mez',
    location: 'Cali',
    service: 'OptometrÃ­a PediÃ¡trica',
    content: 'Mi hijo de 6 aÃ±os fue atendido en optometrÃ­a pediÃ¡trica. El trato fue excelente y muy paciente.',
    avatar: '/api/placeholder/150/150',
    rating: 5
  }
]

const FAQ_ITEMS = [
  {
    question: 'Â¿Con quÃ© frecuencia debo realizarme un examen visual?',
    answer: 'Se recomienda realizar un examen visual completo una vez al aÃ±o. Sin embargo, si tienes condiciones especÃ­ficas o usas lentes correctivos, tu optÃ³metra puede recomendarte revisiones mÃ¡s frecuentes.'
  },
  {
    question: 'Â¿QuÃ© incluye el examen visual completo?',
    answer: 'Nuestro examen visual completo incluye evaluaciÃ³n de agudeza visual, refracciÃ³n, presiÃ³n intraocular, salud de la retina, evaluaciÃ³n de la coordinaciÃ³n ocular y detecciÃ³n temprana de patologÃ­as.'
  },
  {
    question: 'Â¿Desde quÃ© edad se recomienda realizar exÃ¡menes visuales?',
    answer: 'Recomendamos realizar el primer examen visual a los 6 meses de edad, luego a los 3 aÃ±os y antes de iniciar la etapa escolar. Posteriormente, se recomienda un examen anual.'
  },
  {
    question: 'Â¿CuÃ¡nto tiempo toma adaptarse a nuevos lentes?',
    answer: 'El perÃ­odo de adaptaciÃ³n varÃ­a segÃºn cada persona y el tipo de lentes. Generalmente toma entre 1 y 2 semanas adaptarse completamente a una nueva prescripciÃ³n.'
  }
]

export default function ServiciosPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const formatPrice = (price: number) => {
    if (price === 0) return 'Sin costo adicional'
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const filteredServices = selectedCategory === 'todos' 
    ? SERVICES 
    : SERVICES.filter(service => service.category === selectedCategory)

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] opacity-10 mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              Servicios de OptometrÃ­a
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto mb-8"
            >
              Cuidado visual profesional y personalizado para toda la familia
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#servicios"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg"
              >
                Ver Servicios
              </Link>
              <Link
                href="#contacto"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
              >
                Agendar Cita
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Â¿Por quÃ© elegir Horus Optic?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              MÃ¡s de 10 aÃ±os de experiencia cuidando la salud visual de nuestros pacientes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Servicios profesionales de optometrÃ­a con la mÃ¡s alta calidad y tecnologÃ­a
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/20'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={`${selectedCategory}-${service.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden group"
                >
                  {service.popular && (
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 text-center">
                      ðŸŒŸ MÃ¡s Popular
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-xl flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {formatPrice(service.price)}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {service.duration}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                          <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors duration-300 group-hover:shadow-lg">
                      Agendar Cita
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Un enfoque simple y efectivo para cuidar tu salud visual
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-purple-200 dark:bg-purple-800 transform -translate-x-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Testimonios reales de quienes han confiado en nosotros
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.location} â€¢ {testimonial.service}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Resolvemos las dudas mÃ¡s comunes sobre nuestros servicios
            </p>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 text-slate-600 dark:text-slate-300">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-16 lg:py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Â¿Listo para cuidar tu salud visual?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Agenda tu cita con nuestros especialistas y comienza el camino hacia una mejor visiÃ³n
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:+57-301-234-5678"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 shadow-lg flex items-center justify-center"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Llamar Ahora
              </Link>
              <Link
                href="/contacto"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
              >
                Agendar en LÃ­nea
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
