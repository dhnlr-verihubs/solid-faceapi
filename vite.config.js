import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  esbuild: {
    legalComments: 'none',
    minify: true,
  },
  plugins: [solidPlugin()],
});
