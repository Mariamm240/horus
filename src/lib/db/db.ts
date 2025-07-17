import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "../schema"

let client: postgres.Sql

if (process.env.NODE_ENV === "production") {
  client = postgres(process.env.DATABASE_URL!)
} else {
  // Singleton pattern for development to prevent "too many clients"
  const globalForDb = globalThis as unknown as {
    client: postgres.Sql | undefined
  }

  if (!globalForDb.client) {
    globalForDb.client = postgres(process.env.DATABASE_URL!)
  }
  client = globalForDb.client
}

export const db = drizzle(client, { schema })
