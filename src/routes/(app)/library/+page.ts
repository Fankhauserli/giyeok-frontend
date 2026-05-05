import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/library?limit=100');
	const words = await res.json();
	return { words: words || [] };
};
