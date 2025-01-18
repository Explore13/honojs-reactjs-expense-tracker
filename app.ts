import { Hono } from "hono";
import { logger } from "hono/logger";
import expenseRoute from "./routes/expenseRoute";

const app = new Hono({strict:false});
/*
Disabled strict matching for routes by setting `strict: false` to handle both with and without trailing slashes.
This ensures `/api/expense` and `/api/expense/` are treated as the same route.
*/

app.use("*", logger());
app.route("/api/expense",expenseRoute)
// app.get("/user", (c) => {
//   return c.json({
//     message: "Hello from Hono",
//   });
// });

export default app;
