import { z } from "zod";

export const expenseSchemawithId = z.object({
  id: z.number().positive().min(1),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  amount: z.string(),
});
export const expenseSchema = expenseSchemawithId.omit({ id: true });

export type Expense = z.infer<typeof expenseSchemawithId>;
