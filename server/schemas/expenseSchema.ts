import { z } from "zod";

export const expenseSchemawithId = z.object({
  id: z.number().positive().min(1),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  amount: z.string().regex(/^(?!0(\.0{1,2})?$)\d+(\.\d{1,2})?$/, {
    message: "Amount must be a positive number and not zero",
  }),
});
export const expenseSchema = expenseSchemawithId.omit({ id: true });

export type Expense = z.infer<typeof expenseSchemawithId>;
