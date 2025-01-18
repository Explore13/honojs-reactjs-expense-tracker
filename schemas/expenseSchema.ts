import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

export type Expense = {
  id: number;
  title: string;
  amount: number;
};
