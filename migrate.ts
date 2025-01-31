import postgres from "postgres";
import { config } from "./server/config/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

const migrationClient = postgres(config.DATABASE_URL, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
console.log("Migration Completed");
