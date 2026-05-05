<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<div class="max-w-md mx-auto bg-paper p-12 rounded-xl border border-stone-200 mt-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
	<h1 class="text-4xl font-black text-ink mb-2 text-center italic font-serif leading-none">Welcome.</h1>
	<p class="text-ink-muted text-center mb-12 font-medium uppercase tracking-widest text-[10px]">Return to your practice</p>
	
	<form method="POST" action="?/login" use:enhance class="space-y-8">
		<div class="space-y-2 group">
			<label for="email" class="block text-[10px] font-black text-ink-muted uppercase tracking-[0.2em] ml-1 group-focus-within:text-brand-500 transition-colors">Email Address</label>
			<input type="email" name="email" id="email" required class="block w-full px-4 py-4 bg-stone-50 border-b-2 border-stone-100 focus:border-brand-500 focus:bg-white focus:outline-none transition-all font-medium" placeholder="you@example.com" />
		</div>
		<div class="space-y-2 group text-left">
			<label for="password" class="block text-[10px] font-black text-ink-muted uppercase tracking-[0.2em] ml-1 group-focus-within:text-brand-500 transition-colors">Password</label>
			<input type="password" name="password" id="password" required class="block w-full px-4 py-4 bg-stone-50 border-b-2 border-stone-100 focus:border-brand-500 focus:bg-white focus:outline-none transition-all font-medium" placeholder="••••••••" />
		</div>
		
		{#if form?.error}
			<div class="bg-brand-50 text-brand-700 p-4 rounded-lg text-xs font-bold border border-brand-100 animate-in fade-in slide-in-from-top-1">
				{form.error}
			</div>
		{/if}
		
		<button type="submit" class="w-full bg-ink text-paper py-5 px-4 rounded-xl font-bold text-lg hover:bg-brand-500 transition-all shadow-md active:scale-[0.98] cursor-pointer">
			Sign In
		</button>
	</form>
	
	<p class="mt-12 text-center text-ink-muted font-medium text-sm border-t border-stone-100 pt-8">
		New to Giyeok? <a href="/register" class="text-brand-600 font-bold hover:underline decoration-stone-200">Create Account</a>
	</p>
</div>
