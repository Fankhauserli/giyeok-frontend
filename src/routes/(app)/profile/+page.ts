import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/user/profile');
	const user = await res.json();

	return { 
		userEmail: user.email,
		dailyNewLimit: user.daily_new_limit,
		retentionGoal: user.retention_goal
	};
};
