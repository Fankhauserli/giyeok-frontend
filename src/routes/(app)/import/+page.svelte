<script lang="ts">
	let jsonInput = $state('');
	let status = $state('');
	let loading = $state(false);

	async function handleImport() {
		try {
			loading = true;
			const data = JSON.parse(jsonInput);
			const res = await fetch('/api/words/import', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				status = 'Successfully imported!';
				jsonInput = '';
			} else {
				const err = await res.json();
				status = 'Error: ' + err.error;
			}
		} catch (e) {
			status = 'Error: Invalid JSON';
		} finally {
			loading = false;
		}
	}
</script>

<div class="max-w-4xl mx-auto px-4">
	<header class="mb-16 border-b border-stone-200 pb-10">
		<h1 class="text-5xl font-black text-ink tracking-tighter mb-4 italic font-serif">Expand.</h1>
		<p class="text-ink-muted font-medium text-lg uppercase tracking-[0.2em]">Build your study library</p>
	</header>
	
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start mb-20">
		<div class="lg:col-span-2">
			<div class="bg-paper border border-stone-200 p-10 rounded-xl">
				<label for="json" class="block text-[10px] font-black text-ink-muted uppercase tracking-[0.3em] mb-4">JSON Raw Data</label>
				<textarea 
					id="json" 
					bind:value={jsonInput} 
					class="w-full h-80 p-6 bg-stone-50 border-b-2 border-stone-100 focus:border-brand-500 focus:bg-white focus:outline-none transition-all font-mono text-xs mb-8"
				></textarea>
				
				{#if status}
					<div class="mb-8 p-5 rounded-lg font-bold animate-in fade-in {status.startsWith('Error') ? 'bg-brand-50 text-brand-700 border border-brand-100' : 'bg-stone-100 text-ink border border-stone-200'}">
						{status}
					</div>
				{/if}
				
				<button 
					onclick={handleImport} 
					disabled={loading}
					class="w-full bg-ink text-paper py-5 rounded-xl font-bold text-lg hover:bg-brand-500 disabled:opacity-30 transition-all shadow-md active:scale-[0.99] cursor-pointer"
				>
					{loading ? 'Processing...' : 'Run Import'}
				</button>
			</div>
		</div>

		<div class="space-y-12">
			<div>
				<h2 class="text-xs font-black text-ink uppercase tracking-widest mb-6 border-l-2 border-brand-500 pl-4">Instructions</h2>
				<p class="text-ink-muted leading-relaxed font-serif italic text-lg">
					Giyeok accepts standard JSON arrays. Ensure your data follows the required schema to maintain algorithm accuracy.
				</p>
			</div>

			<div class="space-y-4">
				<div class="text-[10px] font-black text-ink uppercase tracking-widest">Required Fields</div>
				<ul class="space-y-3">
					<li class="flex items-center gap-2 text-sm font-medium">
						<span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
						<code>korean</code> <span class="text-ink-muted italic">(string)</span>
					</li>
					<li class="flex items-center gap-2 text-sm font-medium">
						<span class="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
						<code>english</code> <span class="text-ink-muted italic">(string)</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
