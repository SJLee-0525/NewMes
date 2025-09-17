import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@mocks": path.resolve(__dirname, "src/mocks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@datas": path.resolve(__dirname, "src/datas"),
    },
  },
});
