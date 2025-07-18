"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormData } from "@/lib/validations"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { toast } from "sonner"

// Note: Metadata should be exported from a server component, 
// but since we need "use client" for the form, we'll handle SEO differently
const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    content: "Calle Mayor 123\n28001 Madrid, España",
    link: "https://maps.google.com/?q=Calle+Mayor+123+Madrid"
  },
  {
    icon: Phone,
    title: "Teléfono",
    content: "+34 123 456 789",
    link: "tel:+34123456789"
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@horusoptic.com",
    link: "mailto:info@horusoptic.com"
  },
  {
    icon: Clock,
    title: "Horario",
    content: "Lun-Vie: 9:00-20:00\nSáb: 10:00-14:00\nDom: Cerrado",
    link: null
  }
]

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // TODO: Implement actual form submission (EmailJS or API route)
      console.log("Form data:", data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success("¡Mensaje enviado correctamente! Te responderemos pronto.")
      reset()
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Error al enviar el mensaje. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Info */}
      <SectionWrapper background="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            const content = info.link ? (
              <a
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : undefined}
                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {info.content}
              </a>
            ) : (
              <span className="text-gray-600">{info.content}</span>
            )

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <div className="text-sm whitespace-pre-line">
                  {content}
                </div>
              </div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Contact Form & Map */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Envíanos un Mensaje
            </h2>
            <p className="text-gray-600 mb-8">
              Completa el formulario y nos pondremos en contacto contigo lo antes posible. 
              Todas las consultas son atendidas en un plazo máximo de 24 horas.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Tu nombre completo"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="+34 123 456 789"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="¿En qué podemos ayudarte?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register("message")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Cuéntanos tu consulta con detalle..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nuestra Ubicación
            </h2>
            <p className="text-gray-600 mb-8">
              Visítanos en nuestra óptica física. Estaremos encantados de atenderte personalmente 
              y ayudarte a encontrar los lentes perfectos para ti.
            </p>

            {/* Embedded Map */}
            <div className="bg-gray-200 rounded-xl overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.4849470281636!2d-3.7037902!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjUiTiAzwrA0MicxMy42Ilc!5e0!3m2!1sen!2ses!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Horus Optic"
              />
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://maps.google.com/?q=Calle+Mayor+123+Madrid"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Cómo Llegar
              </a>
              <a
                href="tel:+34123456789"
                className="flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Encuentra respuestas rápidas a las consultas más comunes
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "¿Necesito cita previa para un examen de la vista?",
              answer: "Recomendamos solicitar cita previa para garantizar una atención personalizada. Puedes reservar online, por teléfono o WhatsApp."
            },
            {
              question: "¿Cuánto tiempo tarda la adaptación de lentes de contacto?",
              answer: "El proceso completo suele tomar entre 45-60 minutos, incluyendo pruebas, enseñanza y seguimiento inicial."
            },
            {
              question: "¿Ofrecen garantía en los lentes de contacto?",
              answer: "Sí, todos nuestros productos tienen garantía del fabricante. Además, ofrecemos cambios sin costo en los primeros 30 días."
            },
            {
              question: "¿Puedo cancelar mi suscripción en cualquier momento?",
              answer: "Absolutamente. Nuestras suscripciones son flexibles y puedes pausar, modificar o cancelar en cualquier momento sin penalizaciones."
            }
          ].map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 group"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer group-open:text-primary transition-colors">
                {faq.question}
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </SectionWrapper>
    </div>
  )
}
