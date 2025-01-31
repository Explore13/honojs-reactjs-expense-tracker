// Make sure to install the 'postgres' package
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "../config/config";

const queryClient = postgres(config.DATABASE_URL);
export const db = drizzle({ client: queryClient });
