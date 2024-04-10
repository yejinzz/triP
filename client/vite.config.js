import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import VitePluginHtmlEnv from "vite-plugin-html-env";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePluginHtmlEnv(),
    VitePluginHtmlEnv({ compiler: true }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
