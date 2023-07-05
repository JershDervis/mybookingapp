/// <reference types="@auth/sveltekit" />

import { VercelPgDatabase } from 'drizzle-orm/vercel-postgres';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			db: VercelPgDatabase<TSchema>;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
