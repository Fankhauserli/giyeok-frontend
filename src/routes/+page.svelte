<script lang="ts">
	let { data } = $props();
</script>

<div class="max-w-4xl mx-auto py-24 text-center">
	<h1 class="text-8xl font-black text-ink mb-8 tracking-tighter leading-[0.9]">
		Build your <span class="italic font-normal serif text-brand-500 underline decoration-stone-200 underline-offset-8">Korean</span> vocabulary.
	</h1>
	
	<p class="text-2xl text-ink-muted mb-16 max-w-2xl mx-auto leading-relaxed font-serif italic">
		A calm, science-backed approach to language retention using the Free Spaced Repetition Scheduler.
	</p>
	
	<div class="flex justify-center gap-8">
		{#if data.user?.loggedIn}
			<a href="/dashboard" class="bg-ink text-paper py-5 px-12 rounded-xl font-bold text-xl hover:bg-brand-500 transition-all shadow-lg active:scale-95">
				Open Dashboard
			</a>
		{:else}
			<a href="/register" class="bg-ink text-paper py-5 px-12 rounded-xl font-bold text-xl hover:bg-brand-500 transition-all shadow-lg active:scale-95">
				Create Account
			</a>
			<a href="/login" class="bg-paper text-ink py-5 px-12 rounded-xl font-bold text-xl hover:bg-stone-50 transition-all border border-stone-200 active:scale-95 shadow-sm">
				Log In
			</a>
		{/if}
	</div>
	
	<div class="mt-40 grid grid-cols-1 md:grid-cols-3 gap-16 text-left border-t border-stone-200 pt-20">
		<div class="group">
			<div class="text-stone-300 text-6xl font-serif mb-6 group-hover:text-brand-500 transition-colors">01.</div>
			<h3 class="text-2xl font-black mb-4 uppercase tracking-tighter text-ink">Smart Scheduling</h3>
			<p class="text-ink-muted leading-relaxed font-medium">FSRS algorithm precisely calculates review intervals based on your personal memory stability and difficulty.</p>
		</div>
		
		<div class="group">
			<div class="text-stone-300 text-6xl font-serif mb-6 group-hover:text-brand-500 transition-colors">02.</div>
			<h3 class="text-2xl font-black mb-4 uppercase tracking-tighter text-ink">TOPIK Focused</h3>
			<p class="text-ink-muted leading-relaxed font-medium">Designed specifically for TOPIK proficiency levels, keeping your learning path structured and efficient.</p>
		</div>
		
		<div class="group">
			<div class="text-stone-300 text-6xl font-serif mb-6 group-hover:text-brand-500 transition-colors">03.</div>
			<h3 class="text-2xl font-black mb-4 uppercase tracking-tighter text-ink">Deep Focus</h3>
			<p class="text-ink-muted leading-relaxed font-medium">A minimal, distraction-free environment that prioritizes your cognitive load for maximum retention.</p>
		</div>
	</div>
</div>
