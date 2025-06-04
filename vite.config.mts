import contentCollections from "@content-collections/vite";
import { defineConfig } from "vite";
import { redwood } from "rwsdk/vite";

export default defineConfig({
  plugins: [redwood(), contentCollections()],
});
