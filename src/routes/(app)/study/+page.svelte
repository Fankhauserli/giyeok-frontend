<div class="max-w-4xl mx-auto px-4 py-10 text-center">
	<header class="mb-20">
		<h1 class="text-6xl font-black text-ink tracking-tighter mb-4 italic font-serif">Prepare.</h1>
		<p class="text-ink-muted font-medium text-lg uppercase tracking-[0.2em]">Select your target TOPIK level</p>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		<a href="/study/session?level=0" class="col-span-full bg-paper border border-stone-200 p-10 rounded-xl hover:border-brand-500 transition-all shadow-sm group">
			<div class="text-xs font-black text-stone-300 uppercase tracking-widest mb-2 group-hover:text-brand-500 transition-colors">Comprehensive</div>
			<div class="text-4xl font-serif font-black italic text-ink">All Levels</div>
			<p class="mt-4 text-ink-muted font-medium italic">Study words from your entire library across all proficiency levels.</p>
		</a>

		{#each [1, 2, 3, 4, 5, 6] as level}
			<a href="/study/session?level={level}" class="bg-paper border border-stone-200 p-10 rounded-xl hover:border-brand-500 transition-all shadow-sm group flex flex-col items-center justify-center">
				<div class="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1 group-hover:text-brand-500 transition-colors">TOPIK</div>
				<div class="text-5xl font-serif font-black italic text-ink mb-2 leading-none">Lv.{level}</div>
				<div class="mt-4 w-8 h-1 bg-stone-100 group-hover:bg-brand-500 transition-colors rounded-full"></div>
			</a>
		{/each}
	</div>

	<div class="mt-24 text-stone-300 font-serif italic text-lg">
		"Learning a language is like carving a path through a mountain."
	</div>
</div>
