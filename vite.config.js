import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { legalNoticePublishError } from "./src/config/legal.js";

function legalNoticePublishGuard() {
  return {
    name: "legal-notice-publish-guard",
    apply: "build",
    buildStart() {
      const error = legalNoticePublishError();
      if (error) throw new Error(error);
    },
  };
}

export default defineConfig({
  plugins: [react(), legalNoticePublishGuard()],
  server: { port: 4181, strictPort: true },
  preview: { port: 4182, strictPort: true },
});
