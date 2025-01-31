import { defineConfig } from "drizzle-kit";
import { config } from "./server/config/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./server/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL,
  },
});
