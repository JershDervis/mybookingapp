import { users, accounts, sessions, verificationTokens } from './schema/auth';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

export const defaultSchema = { users, accounts, sessions, verificationTokens };
export type DefaultSchema = typeof defaultSchema;
export const db = drizzle(sql);
export type DbClient = typeof db;

//  Do migrations - in dev
if (import.meta.env.DEV) await migrate(db, { migrationsFolder: '.drizzle' });
