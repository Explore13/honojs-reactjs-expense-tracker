import type { Expense } from "../schemas/expenseSchema";

export const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Groceries",
    amount: 50.25,
  },
  {
    id: 2,
    title: "Electricity Bill",
    amount: 75.0,
  },
  {
    id: 3,
    title: "Internet",
    amount: 45.99,
  },
  {
    id: 4,
    title: "Rent",
    amount: 1200.0,
  },
  {
    id: 5,
    title: "Gym Membership",
    amount: 30.0,
  },
];
