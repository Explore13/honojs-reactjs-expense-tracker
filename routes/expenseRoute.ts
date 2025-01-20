import { Hono, type Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { expenseSchema, type Expense } from "../schemas/expenseSchema";
import { fakeExpenses } from "../utils/fakeExpenses";

const expenseRoute = new Hono()
  .get("/", (c: Context) => {
    return c.json({
      message: "Expenses fetched successfully",
      expenses: fakeExpenses,
    });
  })
  .post("/", zValidator("json", expenseSchema), async (c: Context) => {
    try {
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
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id")); // By default path params are String
    const expense = fakeExpenses.find((expense) => expense.id === id);
    console.log(expense);

    if (!expense) return c.notFound();

    return c.json({
      expense,
    });
  })
  .delete("/:id{[0-9]+}", (c) => {
    try {
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
