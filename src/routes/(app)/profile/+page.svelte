<script lang="ts">
	let { data } = $props();
	let dailyLimit = $state(data.dailyNewLimit);
	let retentionGoal = $state((data.retentionGoal * 100).toFixed(0));
	let saving = $state(false);
	let message = $state('');

	async function saveSettings() {
		saving = true;
		message = '';
		try {
			const res = await fetch('/api/user/settings', {
				method: 'POST',
				body: JSON.stringify({ 
					daily_new_limit: parseInt(dailyLimit),
					retention_goal: parseFloat(retentionGoal) / 100
				}),
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.ok) {
				message = 'Settings saved successfully.';
			} else {
				message = 'Error saving settings.';
			}
		} catch (e) {
			message = 'Connection error.';
		} finally {
			saving = false;
		}
	}
</script>

<div class="max-w-2xl mx-auto px-4">
	<header class="mb-16 border-b border-stone-200 pb-10">
		<h1 class="text-5xl font-black text-ink tracking-tighter mb-4 italic font-serif">Profile.</h1>
		<p class="text-ink-muted font-medium text-lg uppercase tracking-[0.2em]">Manage your account and learning intensity</p>
	</header>

	<div class="space-y-12 bg-paper border border-stone-200 p-12 rounded-xl">
		<div class="space-y-2">
			<label class="block text-[10px] font-black text-ink-muted uppercase tracking-[0.3em]">Account Email</label>
			<p class="text-xl font-serif italic text-ink">{data.userEmail}</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
			<div class="space-y-4">
				<label for="limit" class="block text-[10px] font-black text-ink-muted uppercase tracking-[0.3em]">Daily New Word Limit</label>
				<div class="relative">
					<input 
						id="limit"
						type="number" 
						bind:value={dailyLimit}
						class="w-full bg-stone-50 border-b-2 border-stone-100 py-4 px-2 text-2xl font-serif italic focus:border-brand-500 focus:bg-white outline-none transition-all"
					/>
					<span class="absolute right-2 bottom-4 text-xs font-black text-stone-300 uppercase tracking-widest">Words</span>
				</div>
				<p class="text-[10px] text-stone-400 font-medium leading-relaxed">The number of fresh words the algorithm will introduce each day.</p>
			</div>

			<div class="space-y-4">
				<label for="retention" class="block text-[10px] font-black text-ink-muted uppercase tracking-[0.3em]">Target Retention (%)</label>
				<div class="relative">
					<input 
						id="retention"
						type="number" 
						bind:value={retentionGoal}
						min="50"
						max="99"
						class="w-full bg-stone-50 border-b-2 border-stone-100 py-4 px-2 text-2xl font-serif italic focus:border-brand-500 focus:bg-white outline-none transition-all"
					/>
					<span class="absolute right-2 bottom-4 text-xs font-black text-stone-300 uppercase tracking-widest">Percent</span>
				</div>
				<p class="text-[10px] text-stone-400 font-medium leading-relaxed">Higher values (90%+) make reviews more frequent to ensure better memory.</p>
			</div>
		</div>

		<div class="pt-8 flex items-center justify-between gap-6 border-t border-stone-100">
			{#if message}
				<p class="text-xs font-bold {message.includes('Error') ? 'text-brand-600' : 'text-stone-500'} italic font-serif animate-in fade-in">{message}</p>
			{:else}
				<div></div>
			{/if}
			
			<button 
				onclick={saveSettings} 
				disabled={saving}
				class="bg-ink text-paper py-4 px-12 rounded-xl font-bold hover:bg-brand-500 shadow-md active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
			>
				{saving ? 'Saving...' : 'Update Settings'}
			</button>
		</div>
	</div>
</div>
