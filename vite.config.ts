import { defineConfig } from 'vite';
import solid from '@solidjs/vite-plugin';

export default defineConfig({
	plugins: [solid()],
	publicDir: 'static',
	build: { outDir: 'build' },
	resolve: {
		// solid-icons is precompiled against Solid 1.x internals; the runtime
		// helpers it imports all still exist under the new package name.
		alias: { 'solid-js/web': '@solidjs/web' }
	}
});
