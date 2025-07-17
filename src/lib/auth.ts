import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { eq } from "drizzle-orm"
import authConfig from "./auth.config"
import { db } from "./db/db"
import { users, accounts, sessions, verificationTokens } from "./schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      
      // For OAuth providers, update the user with additional info
      if (account?.provider === "google" && user) {
        try {
          await db
            .update(users)
            .set({
              name: user.name,
              image: user.image,
              updatedAt: new Date(),
            })
            .where(eq(users.id, user.id!))
        } catch (error) {
          console.error("Error updating user from OAuth:", error)
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string
      }

      // Fetch fresh user data from database
      try {
        const user = await db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
            firstName: users.firstName,
            lastName: users.lastName,
            phone: users.phone,
          })
          .from(users)
          .where(eq(users.id, session.user.id))
          .limit(1)

        if (user.length > 0) {
          session.user = {
            ...session.user,
            ...user[0],
          }
        }
      } catch (error) {
        console.error("Error fetching user in session callback:", error)
      }

      return session
    },
    async signIn({ account }) {
      // Allow OAuth sign ins
      if (account?.provider === "google") {
        return true
      }

      // Allow credentials sign ins
      if (account?.provider === "credentials") {
        return true
      }

      return false
    },
  },
  events: {
    async createUser({ user }) {
      console.log("New user created:", user.email)
    },
    async signIn({ user, account, isNewUser }) {
      console.log("User signed in:", user.email, "Provider:", account?.provider)
      if (isNewUser) {
        console.log("New user signed in for the first time")
      }
    },
  },
})
