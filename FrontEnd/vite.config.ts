import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": "http://localhost:8000/",
  //   },
  // },
  // base: "/TaskManager/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
