import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	// resolve: {
	// 	conditions: ['svelte']
	// },
	// optimizeDeps: {
	// 	exclude: ['svelte-ionicons']
	// },
	server: {
		fs: {
			allow: ['.']
		}
	}
};

export default config;
