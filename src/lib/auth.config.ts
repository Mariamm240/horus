import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "./db/db"
import { users } from "./schema"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentialsSchema.parse(credentials)

          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)

          if (!user.length || !user[0].password) {
            return null
          }

          const isValidPassword = await compare(password, user[0].password)

          if (!isValidPassword) {
            return null
          }

          return {
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
            image: user[0].image,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig
