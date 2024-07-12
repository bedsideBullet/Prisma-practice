// vitest.config.integration.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["problems/**/*.test.ts"],
    maxThreads: 1,
    minThreads: 1,
    threads: false,
  },
});
