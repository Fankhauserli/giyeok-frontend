import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		proxy: {
			'/api': 'http://localhost:8080'
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test-setup.ts'],
		poolOptions: {
			threads: {
				singleThread: true
			}
		},
		server: {
			deps: {
				inline: [/@testing-library\/svelte/]
			}
		}
	},
	resolve: {
		conditions: ['browser', 'development']
	}
});
