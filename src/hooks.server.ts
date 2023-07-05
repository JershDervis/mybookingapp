import type { Handle } from '@sveltejs/kit';
import { db } from '$lib/database/db';
import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { NEXTAUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { pgDrizzleAdapter } from '$lib/database/auth-adapter';
import type { CallbacksOptions } from '@auth/core/types';
import { sequence } from '@sveltejs/kit/hooks';

const authHandler = SvelteKitAuth(async (event) => {
	const authOptions = {
		secret: NEXTAUTH_SECRET,
		session: {
			strategy: 'database'
		},
		callbacks: {
			async session({ session, user }) {
				// Send properties to the client, like an access_token and user id from a provider.
				return session;
			}
		} satisfies Partial<CallbacksOptions>,
		debug: import.meta.env.DEV,
		trustHost: true,
		adapter: pgDrizzleAdapter(event.locals.db),
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
	};
	return authOptions as SvelteKitAuthConfig;
}) satisfies Handle;

const dbHandler = (async ({ event, resolve }) => {
	event.locals.db = db;
	const response = await resolve(event);
	return response;
}) satisfies Handle;

export const handle = sequence(authHandler, dbHandler);
