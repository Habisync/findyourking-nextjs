// Native PostgreSQL connection with Drizzle ORM
// NO Supabase client - direct PostgreSQL for maximum performance
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Native PostgreSQL connection - faster than Supabase client
const queryClient = postgres(process.env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(queryClient, { schema });

// Export schema for type-safe queries
export * from './schema';
