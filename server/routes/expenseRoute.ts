import { Hono, type Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { expenseSchema, type Expense } from "../schemas/expenseSchema";
// import { fakeExpenses } from "../utils/fakeExpenses";
import { getUser } from "../kinde";
import { db } from "../db";
import { expensesTable } from "../db/schema/expenses";
import { and, desc, eq, sum } from "drizzle-orm";

const getTodayDate = () => {
  const today = new Date();
  return today.toDateString();
};
const expenseRoute = new Hono()
  .get("/total-expenses", getUser, async (c) => {
    try {
      const user = c.var.user;

      const expenses = await db
        .select()
        .from(expensesTable)
        .where(eq(expensesTable.userId, user.id))
        .orderBy(desc(expensesTable.createdAt))
        .limit(3);

      // const totalExpenses = expenses.reduce(
      //   (acc, expense) => acc + +expense.amount,
      //   0
      // );

      // fetch total expenses using sum function

      const totalExpenses = await db
        .select({ total: sum(expensesTable.amount) })
        .from(expensesTable)
        .where(eq(expensesTable.userId, user.id))
        .limit(1)
        .then((res) => res[0]);

      const todaysExpenses = await db
        .select({ total: sum(expensesTable.amount) })
        .from(expensesTable)
        .where(eq(expensesTable.creationDate, getTodayDate()))
        .then((res) => res[0]);

      await new Promise((r) => setTimeout(r, 2000)); // Hard-coded loading to display the skeleton loader

      return c.json({
        totalExpenses: totalExpenses.total,
        todaysExpenses: todaysExpenses.total || "0",
        expenses: expenses,
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
  .get("/", getUser, async (c: Context) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json({
      message: "Expenses fetched successfully",
      expenses: expenses,
    });
  })
  .post("/", getUser, zValidator("json", expenseSchema), async (c: Context) => {
    try {
      const user = c.var.user;
      const expense: Expense = await c.req.valid("json");
      console.log(expense);

      const result = await db
        .insert(expensesTable)
        .values({
          ...expense,
          userId: user.id,
          creationDate: getTodayDate(),
        })
        .returning();
      return c.json(
        {
          message: "Expense added successfully",
          expense: result,
        },
        201
      );
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to add expense" }, 500);
    }
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id")); // By default path params are String
    // const expense = fakeExpenses.find((expense) => expense.id === id);
    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)));
    console.log(expense);

    if (!expense) return c.notFound();

    return c.json({
      expense,
    });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    try {
      const user = c.var.user;
      const id = Number.parseInt(c.req.param("id"));
      // const index = fakeExpenses.findIndex((expense) => expense.id === id);
      // if (index === -1) return c.notFound();
      // const deletedExpense = fakeExpenses.splice(index, 1)[0];
      // console.log(fakeExpenses);

      const deletedExpense = await db
        .delete(expensesTable)
        .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
        .returning()
        .then((res) => res[0]);

      if (!deletedExpense) return c.notFound();
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
