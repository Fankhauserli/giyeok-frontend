<script lang="ts">
	let { data } = $props();
</script>

<div class="max-w-5xl mx-auto px-4">
	<header class="mb-20 border-b border-stone-200 pb-10 flex justify-between items-end">
		<div>
			<h1 class="text-6xl font-black text-ink tracking-tighter mb-4 leading-none italic font-serif">Hello.</h1>
			<p class="text-ink-muted font-medium text-lg uppercase tracking-[0.2em] font-sans">Your Progress Overview</p>
		</div>
		<div class="hidden md:flex flex-col items-end gap-1">
			<div class="text-xs font-black text-brand-500 uppercase tracking-widest">{data.streak} Day Streak</div>
			<div class="flex gap-1">
				{#each Array(7) as _, i}
					<div class="w-3 h-3 rounded-sm {i < data.weeklyDays ? 'bg-brand-500 shadow-[0_0_8px_rgba(200,122,100,0.3)]' : 'bg-stone-200'}"></div>
				{/each}
			</div>
		</div>
	</header>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-start">
		<div class="lg:col-span-2 group">
			<div class="mb-6 flex justify-between items-end px-2">
				<span class="text-xs font-black text-ink uppercase tracking-widest">Daily Goal</span>
				<span class="text-xs font-bold text-ink-muted uppercase italic font-serif">{data.dueCount} remaining</span>
			</div>
			<div class="bg-paper border border-stone-200 p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-10 hover:border-brand-300 transition-colors">
				<div class="text-center md:text-left">
					<div class="text-ink text-9xl font-black mb-2 tabular-nums tracking-tighter italic font-serif leading-none">{data.dueCount}</div>
					<div class="text-ink-muted font-black uppercase tracking-[0.3em] text-[10px]">Cards for Review</div>
				</div>

				<a href="/study" class="bg-ink text-paper py-6 px-16 rounded-xl font-bold text-xl hover:bg-brand-500 transition-all shadow-md active:scale-95 flex items-center gap-3">
					Study Now
				</a>
			</div>
		</div>

        <div class="bg-brand-50 p-10 rounded-xl border border-brand-100 flex flex-col relative group">
            <h2 class="text-lg font-black mb-4 uppercase tracking-tighter text-brand-600">Weekly Achievement</h2>
            <p class="text-brand-800 text-lg mb-8 font-medium font-serif leading-relaxed italic">"Slow and steady wins the race." You're maintaining a great pace this week.</p>

			<div class="flex items-end gap-3 mb-4">
				<div class="flex-1 bg-stone-200 h-1 rounded-full overflow-hidden">
					<div class="bg-brand-500 h-full transition-all duration-1000" style="width: {(data.weeklyDays / 7) * 100}%"></div>
				</div>
				<span class="text-xs font-black text-brand-600">{((data.weeklyDays / 7) * 100).toFixed(0)}%</span>
			</div>
			<div class="text-[10px] font-black uppercase tracking-widest text-brand-400">{data.weeklyDays} of 7 days completed</div>
        </div>
	</div>

    <div class="mb-20">
        <h2 class="text-xs font-black text-ink-muted mb-10 uppercase tracking-[0.4em] text-center">Level Proficiency</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {#each data.proficiency as level}
    <div class="bg-paper border-b-2 border-stone-200 p-8 flex flex-col gap-6 hover:bg-stone-50 transition-colors">
        <div class="flex justify-between items-center">
            <div class="font-serif italic text-2xl font-bold text-stone-400">Lv.{level.topik_level}</div>
            <div class="font-black text-ink text-xs tabular-nums tracking-widest">
                {level.total > 0 ? ((level.reviewed / level.total) * 100).toFixed(0) : 0}%
            </div>
        </div>
                    <div class="w-full bg-stone-100 h-1 overflow-hidden">
                        <div class="bg-brand-500 h-full transition-all duration-1000 ease-out" style="width: {level.total > 0 ? (level.reviewed / level.total) * 100 : 0}%"></div>
                    </div>
                    <div class="text-[10px] font-black text-stone-300 uppercase tracking-widest">
                        {level.reviewed} / {level.total} Words Learned
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
