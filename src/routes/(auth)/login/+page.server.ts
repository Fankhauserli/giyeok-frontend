import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const res = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (!res.ok) {
			const error = await res.json().catch(() => ({ error: 'Login failed' }));
			return fail(401, { error: error.error });
		}

		// The backend sets the HttpOnly cookie, so we don't need to do anything here
		// unless we want to redirect.
		throw redirect(303, '/dashboard');
	},

	logout: async ({ fetch, cookies }) => {
		await fetch('/api/auth/logout', { method: 'POST' });
		cookies.delete('jwt', { path: '/' });
		throw redirect(303, '/login');
	}
};
