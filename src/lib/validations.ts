import { z } from "zod"

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres")
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z.string().email("Email inválido")
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})

export type LoginData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

export type RegisterData = z.infer<typeof registerSchema>

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido")
})

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
