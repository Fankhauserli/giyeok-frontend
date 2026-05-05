import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const level = url.searchParams.get('level') || '0';
	const res = await fetch(`/api/study/due?level=${level}`);
	const words = await res.json();
	return { 
		words: words || [],
		level: parseInt(level)
	};
};
