<script lang="ts">
	import './layout.css';
	let { children, data } = $props();
</script>

<nav class="bg-paper border-b border-stone-200 py-6 sticky top-0 z-50">
	<div class="container mx-auto px-6 flex justify-between items-center text-ink">
		<a href="/" class="flex items-center gap-3 group">
			<span class="bg-ink text-paper w-10 h-10 flex items-center justify-center rounded-lg font-serif text-2xl font-bold group-hover:bg-brand-500 transition-colors">기</span>
			<span class="text-2xl font-serif font-black tracking-tight tracking-[-0.03em]">Giyeok</span>
		</a>
		<div class="flex items-center gap-8 font-medium">
			{#if data.user?.loggedIn}
				<div class="hidden md:flex items-center gap-6">
					<a href="/dashboard" class="hover:text-brand-500 transition-colors">Dashboard</a>
					<a href="/library" class="hover:text-brand-500 transition-colors">Library</a>
					<a href="/import" class="hover:text-brand-500 transition-colors">Import</a>
					<a href="/profile" class="hover:text-brand-500 transition-colors">Profile</a>
				</div>
				<a href="/study" class="bg-ink text-paper px-6 py-2.5 rounded-lg hover:bg-brand-500 transition-all shadow-sm active:scale-95 font-bold">Study Now</a>
				<form action="/login?/logout" method="POST" class="inline">
					<button type="submit" class="text-ink-muted hover:text-ink transition-colors cursor-pointer text-sm font-bold uppercase tracking-widest">Logout</button>
				</form>
			{:else}
				<a href="/login" class="hover:text-brand-500 transition-colors">Login</a>
				<a href="/register" class="bg-ink text-paper px-6 py-2.5 rounded-lg hover:bg-brand-500 transition-all shadow-sm active:scale-95 font-bold">Get Started</a>
			{/if}
		</div>
	</div>
</nav>

<main class="container mx-auto mt-12 mb-20 px-6">
	{@render children()}
</main>
