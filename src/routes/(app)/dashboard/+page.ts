import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const [dueRes, profRes] = await Promise.all([
		fetch('/api/study/due'),
		fetch('/api/study/proficiency')
	]);

	const dueWords = await dueRes.json();
	const stats = await profRes.json();

	return { 
		dueCount: dueWords?.length || 0,
		proficiency: stats.levels || [],
		weeklyDays: stats.weekly_days || 0,
		streak: stats.streak || 0,
		dailyNewLimit: stats.daily_new_limit || 20
	};
};
