import { Hono, type Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { expenseSchema, type Expense } from "../schemas/expenseSchema";
import { fakeExpenses } from "../utils/fakeExpenses";
import { getUser } from "../kinde";

const expenseRoute = new Hono()
  .get("/total-expenses", getUser, async (c) => {
    try {
      // let totalExpenses = 0;
      // fakeExpenses.forEach((e) => (totalExpenses = totalExpenses + e.amount));
      const user = c.var.user;
      await new Promise((r) => setTimeout(r, 2000)); // Hard-coded loading to display the skeleton loader
      const totalExpenses = fakeExpenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      return c.json({
        totalExpenses: totalExpenses,
        expenses: fakeExpenses,
        message: "Total Expenses fetched successfully",
      });
    } catch (error) {
      return c.json(
        {
          message: { error },
        },
        404
      );
    }
  })
  .get("/", getUser, (c: Context) => {
    const user = c.var.user;
    return c.json({
      message: "Expenses fetched successfully",
      expenses: fakeExpenses,
    });
  })
  .post("/", getUser, zValidator("json", expenseSchema), async (c: Context) => {
    try {
      const user = c.var.user;
      const expense = await c.req.valid("json");
      console.log(expense);
      const newExpense = { id: fakeExpenses.length + 1, ...expense };
      fakeExpenses.push(newExpense);
      console.log(fakeExpenses);

      return c.json(
        {
          message: "Expense added successfully",
          expense: newExpense,
        },
        201
      );
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to add expense" }, 500);
    }
  })
  .get("/:id{[0-9]+}", getUser, (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id")); // By default path params are String
    const expense = fakeExpenses.find((expense) => expense.id === id);
    console.log(expense);

    if (!expense) return c.notFound();

    return c.json({
      expense,
    });
  })
  .delete("/:id{[0-9]+}", getUser, (c) => {
    try {
      const user = c.var.user;
      const id = Number.parseInt(c.req.param("id"));
      const index = fakeExpenses.findIndex((expense) => expense.id === id);
      if (index === -1) return c.notFound();
      const deletedExpense = fakeExpenses.splice(index, 1)[0];
      console.log(fakeExpenses);
      return c.json({
        message: "Expense deleted successfully",
        expense: deletedExpense,
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to delete expense" }, 500);
    }
  });

export default expenseRoute;
