import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (!res.ok) {
			const error = await res.json().catch(() => ({ error: 'Registration failed' }));
			return fail(400, { error: error.error });
		}

		throw redirect(303, '/login');
	}
};
