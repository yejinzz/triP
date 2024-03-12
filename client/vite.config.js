import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import VitePluginHtmlEnv from "vite-plugin-html-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginHtmlEnv(),
    VitePluginHtmlEnv({ compiler: true }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
