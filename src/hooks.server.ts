import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');

	if (jwt) {
		// In a real app, you might want to decode/validate the JWT here
        // For this prototype, we'll assume the presence of the cookie means the user might be logged in
		event.locals.user = { loggedIn: true };
	}

	const response = await resolve(event);
	return response;
};
