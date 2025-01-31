import { z } from "zod";

const expenseSchemawithId = z.object({
  id: z.number().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.string(),
});
export const expenseSchema = expenseSchemawithId.omit({ id: true });

export type Expense = z.infer<typeof expenseSchemawithId>;
