import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				filter: (path) => path.path.startsWith("/tlg"),
			},

			pages: [{ path: "/tlg/page/4", prerender: { enabled: true } }],
		}),
		viteReact(),
	],
});

export default config;
