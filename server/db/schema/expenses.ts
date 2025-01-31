import {
  date,
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const expensesTable = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    creationDate: date("creation_date").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);
