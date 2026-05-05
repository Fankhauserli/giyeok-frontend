<script lang="ts">
	let { data } = $props();
	let words = $state([]);
	let selectedLevel = $state(data.level || 0); 

	$effect(() => {
		words = data.words || [];
	});

	let currentIndex = $state(0);
	let revealed = $state(false);
	let loading = $state(false);

	const currentWord = $derived(words[currentIndex]);

	async function fetchMoreWords() {
		if (loading) return;
		try {
			const levelParam = selectedLevel > 0 ? `&level=${selectedLevel}` : '';
			const res = await fetch(`/api/study/due?limit=20${levelParam}`);
			const newWords = await res.json();
			if (newWords && newWords.length > 0) {
				// Filter out words already in our queue
				const currentIds = new Set(words.map(w => w.id));
				const uniqueNew = newWords.filter(nw => !currentIds.has(nw.id));
				words = [...words, ...uniqueNew];
			}
		} catch (e) {
			console.error('Failed to fetch more words:', e);
		}
	}

	async function rate(rating: number) {
		if (loading || !currentWord) return;
		loading = true;

		const wordId = currentWord.id;

		try {
			// 1. Submit review immediately
			await fetch(`/api/study/review/${wordId}`, {
				method: 'POST',
				body: JSON.stringify({ rating }),
				headers: { 'Content-Type': 'application/json' }
			});

			// 2. Remove the word from the queue
			words = words.filter(w => w.id !== wordId);
			revealed = false;
			currentIndex = 0; // Always point to the first word in the queue

			// 3. If buffer is low (e.g. less than 3 words), fetch more
			if (words.length < 3) {
				await fetchMoreWords();
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (loading || words.length === 0) return;

			if (e.code === 'Space' && !revealed) {
				e.preventDefault();
				revealed = true;
			} else if (revealed && ['1', '2', '3', '4'].includes(e.key)) {
				rate(parseInt(e.key));
			}
		};

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<svelte:window />

<div class="max-w-2xl mx-auto mt-16 px-4">
	<div class="mb-12 flex justify-between items-center px-4">
		<a href="/study" class="text-xs font-black text-ink-muted hover:text-brand-500 transition-colors flex items-center gap-2">
			<span>←</span>
			<span>Change Level</span>
		</a>
		<div class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-ink text-paper shadow-md">
			Studying: {selectedLevel === 0 ? 'All Levels' : `Level ${selectedLevel}`}
		</div>
	</div>

	{#if words.length > 0 && currentWord}
		<div class="bg-paper border border-stone-200 rounded-xl shadow-[0_20px_50px_-12px_rgba(44,42,41,0.08)] p-12 md:p-24 min-h-[500px] flex flex-col justify-center items-center text-center relative group overflow-hidden">
			<!-- Progress Line -->
			<div class="absolute top-0 left-0 right-0 h-1 bg-stone-50">
				<div class="h-full bg-brand-500 transition-all duration-700 ease-out" style="width: {((currentIndex + 1) / words.length) * 100}%"></div>
			</div>

			<div class="absolute top-10 left-10 text-[10px] font-black text-stone-300 tracking-[0.4em] uppercase">
                TOPIK {currentWord.topik_level?.Int32 || '?'}
            </div>

			<div class="absolute top-10 right-10 text-[10px] font-bold text-stone-300 italic font-serif">
                {currentIndex + 1} / {words.length}
            </div>
			
			<div class="text-8xl font-black text-ink mb-16 selection:bg-brand-100 tracking-tighter italic font-serif">{currentWord.korean}</div>
			
			{#if revealed}
				<div class="w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
					<div class="text-3xl font-bold text-ink-muted mb-4 font-serif italic">{currentWord.english}</div>
					<div class="text-xs text-brand-400 font-black uppercase tracking-widest mb-20">
						{currentWord.part_of_speech?.String || ''}
					</div>
					
					<div class="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
						<button onclick={() => rate(1)} disabled={loading} class="bg-stone-50 border border-stone-100 text-ink py-4 rounded-lg font-bold text-xs hover:bg-brand-500 hover:text-white hover:border-brand-500 active:scale-95 transition-all shadow-sm">Again</button>
						<button onclick={() => rate(2)} disabled={loading} class="bg-stone-50 border border-stone-100 text-ink py-4 rounded-lg font-bold text-xs hover:bg-brand-500 hover:text-white hover:border-brand-500 active:scale-95 transition-all shadow-sm">Hard</button>
						<button onclick={() => rate(3)} disabled={loading} class="bg-stone-50 border border-stone-100 text-ink py-4 rounded-lg font-bold text-xs hover:bg-brand-500 hover:text-white hover:border-brand-500 active:scale-95 transition-all shadow-sm">Good</button>
						<button onclick={() => rate(4)} disabled={loading} class="bg-stone-50 border border-stone-100 text-ink py-4 rounded-lg font-bold text-xs hover:bg-brand-500 hover:text-white hover:border-brand-500 active:scale-95 transition-all shadow-sm">Easy</button>
					</div>
				</div>
			{:else}
				<button 
					onclick={() => revealed = true} 
					class="mt-8 bg-ink text-paper py-5 px-14 rounded-xl font-bold text-lg hover:bg-brand-500 shadow-xl active:scale-[0.98] transition-all duration-300"
				>
					Reveal Answer
				</button>
			{/if}
		</div>

		<div class="mt-16 flex justify-center gap-10 text-stone-300 font-black text-[10px] uppercase tracking-[0.2em]">
			<div class="flex items-center gap-3">
				<span class="bg-stone-200 text-stone-500 px-1.5 py-0.5 rounded text-[8px]">SPACE</span>
				<span>Reveal</span>
			</div>
			<div class="flex items-center gap-3">
				<span class="bg-stone-200 text-stone-500 px-1.5 py-0.5 rounded text-[8px]">1-4</span>
				<span>Grade</span>
			</div>
		</div>
	{:else}
		<div class="text-center py-32 px-12 bg-paper border border-stone-200 rounded-xl shadow-sm animate-in fade-in zoom-in-95 duration-1000">
			<div class="text-6xl mb-10 italic font-serif text-stone-200">Done.</div>
			<h2 class="text-3xl font-black text-ink mb-6 tracking-tight italic font-serif">Library Cleared.</h2>
			<p class="text-ink-muted mb-16 text-lg font-medium font-serif italic leading-relaxed max-w-sm mx-auto text-balance">
				You've reached the end of your scheduled reviews. Rest your mind, return tomorrow.
			</p>
			<a href="/dashboard" class="inline-flex items-center gap-2 bg-ink text-paper py-4 px-10 rounded-xl font-bold hover:bg-brand-500 transition-all shadow-lg active:scale-95">
				<span>Return Home</span>
			</a>
		</div>
	{/if}
</div>
