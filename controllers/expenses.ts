import type { Context } from "hono";

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
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

export const getExpenses = async (c: Context) => {
  console.log(fakeExpenses);

  return c.json({
    expenses: fakeExpenses,
  });
};

export const addExpenses = async (c: Context) => {
  const expense: Expense = await c.req.json();
  console.log(expense);
  fakeExpenses.push(expense);
  console.log(fakeExpenses);

  return c.json({
    expense,
  });
};
// export const addExpenses = async (c: any) => {
//     const expense = await c.req.json();
//     fakeExpenses.push(expense);
//     console.log(expense);
//     return c.json({
//       expense,
//     });
//   };
