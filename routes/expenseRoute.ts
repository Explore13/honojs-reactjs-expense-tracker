import { Hono } from "hono";
import { addExpenses, getExpenses } from "../controllers/expenses";

const expenseRoute = new Hono();

expenseRoute.post("/", addExpenses);
expenseRoute.get("/", getExpenses);

export default expenseRoute;
