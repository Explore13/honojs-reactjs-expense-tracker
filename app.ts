import { Hono } from "hono";
import { logger } from "hono/logger";
import expenseRoute from "./routes/expenseRoute";

const app = new Hono();

app.use("*", logger());
app.route("/api/expense",expenseRoute)
// app.get("/user", (c) => {
//   return c.json({
//     message: "Hello from Hono",
//   });
// });

export default app;
