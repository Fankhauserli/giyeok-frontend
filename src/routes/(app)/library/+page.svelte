<script lang="ts">
	let { data } = $props();
	let words = $state(data.words || []);
	let offset = $state(words.length);
	let loadingMore = $state(false);
	let hasMore = $state(words.length === 100); // Initial fetch limit was 100

	// Add Word Form
	let newKorean = $state('');
	let newEnglish = $state('');
	let newLevel = $state(1);
	let adding = $state(false);

	async function showMore() {
		if (loadingMore) return;
		loadingMore = true;
		try {
			const res = await fetch(`/api/library?limit=100&offset=${offset}`);
			const newBatch = await res.json();
			if (newBatch && newBatch.length > 0) {
				words = [...words, ...newBatch];
				offset += newBatch.length;
				hasMore = newBatch.length === 100;
			} else {
				hasMore = false;
			}
		} catch (e) {
			console.error(e);
		} finally {
			loadingMore = false;
		}
	}

	async function addWord() {
		if (!newKorean || !newEnglish) return;
		adding = true;
		try {
			const res = await fetch('/api/words', {
				method: 'POST',
				body: JSON.stringify({ 
					korean: newKorean, 
					english: newEnglish, 
					topik_level: newLevel 
				}),
				headers: { 'Content-Type': 'application/json' }
			});
			if (res.ok) {
				const word = await res.json();
				// Add to list visually (simplified, usually we'd re-fetch)
				words = [{ ...word, state: -1 }, ...words];
				newKorean = '';
				newEnglish = '';
			}
		} catch (e) {
			console.error(e);
		} finally {
			adding = false;
		}
	}

	function getStateLabel(state: number) {
		switch(state) {
			case 0: return 'New';
			case 1: return 'Learning';
			case 2: return 'Review';
			case 3: return 'Relearning';
			default: return 'Unseen';
		}
	}
</script>

<div class="max-w-5xl mx-auto px-4">
	<header class="mb-16 border-b border-stone-200 pb-10 flex justify-between items-end">
		<div>
			<h1 class="text-5xl font-black text-ink tracking-tighter mb-4 italic font-serif">Library.</h1>
			<p class="text-ink-muted font-medium text-lg uppercase tracking-[0.2em]">Manage your vocabulary and see your status</p>
		</div>
	</header>

	<!-- Add Word Section -->
	<div class="bg-paper border border-stone-200 p-8 rounded-xl mb-16">
		<h2 class="text-xs font-black text-ink uppercase tracking-widest mb-8 border-l-2 border-brand-500 pl-4">Add Single Word</h2>
		<form onsubmit={(e) => { e.preventDefault(); addWord(); }} class="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
			<div class="space-y-2">
				<label for="newKorean" class="block text-[10px] font-black text-ink-muted uppercase tracking-widest">Korean</label>
				<input id="newKorean" bind:value={newKorean} required class="w-full bg-stone-50 border-b border-stone-200 p-3 focus:border-brand-500 outline-none transition-all font-serif italic" placeholder="e.g. 바다" />
			</div>
			<div class="space-y-2">
				<label for="newEnglish" class="block text-[10px] font-black text-ink-muted uppercase tracking-widest">English</label>
				<input id="newEnglish" bind:value={newEnglish} required class="w-full bg-stone-50 border-b border-stone-200 p-3 focus:border-brand-500 outline-none transition-all font-serif italic" placeholder="e.g. Sea" />
			</div>
			<div class="space-y-2">
				<label for="newLevel" class="block text-[10px] font-black text-ink-muted uppercase tracking-widest">Level</label>
				<select id="newLevel" bind:value={newLevel} class="w-full bg-stone-50 border-b border-stone-200 p-3 focus:border-brand-500 outline-none transition-all">
					{#each [1, 2, 3, 4, 5, 6] as l}
						<option value={l}>Level {l}</option>
					{/each}
				</select>
			</div>
			<button type="submit" disabled={adding} class="bg-ink text-paper py-3 rounded-lg font-bold hover:bg-brand-500 transition-all active:scale-95 disabled:opacity-50">
				{adding ? 'Adding...' : 'Add Word'}
			</button>
		</form>
	</div>

	<!-- Words List -->
	<div class="space-y-4">
		<div class="grid grid-cols-5 px-6 text-[10px] font-black text-ink-muted uppercase tracking-[0.2em]">
			<div class="col-span-1">Level</div>
			<div class="col-span-1">Korean</div>
			<div class="col-span-2">English</div>
			<div class="col-span-1 text-right">Status</div>
		</div>
		
		<div class="bg-paper border border-stone-100 rounded-xl divide-y divide-stone-50 overflow-hidden shadow-sm">
			{#each words as word}
				<div class="grid grid-cols-5 px-6 py-5 items-center hover:bg-stone-50/50 transition-colors">
					<div class="col-span-1">
						<span class="font-serif italic text-stone-400 font-bold">Lv.{word.topik_level}</span>
					</div>
					<div class="col-span-1">
						<span class="text-xl font-serif font-black text-ink tracking-tight">{word.korean}</span>
					</div>
					<div class="col-span-2">
						<span class="text-ink-muted font-medium">{word.english}</span>
					</div>
					<div class="col-span-1 text-right">
						<span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
							{word.state === -1 ? 'bg-stone-100 text-stone-400' : 
							 word.state === 0 ? 'bg-brand-50 text-brand-600' : 
							 'bg-emerald-50 text-emerald-600'}">
							{getStateLabel(word.state)}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if hasMore}
		<div class="mt-12 flex justify-center">
			<button 
				onclick={showMore} 
				disabled={loadingMore}
				class="bg-paper border border-stone-200 text-ink-muted py-4 px-12 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:text-brand-500 hover:border-brand-200 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
			>
				{loadingMore ? 'Loading...' : 'Show More Words'}
			</button>
		</div>
	{/if}
</div>
