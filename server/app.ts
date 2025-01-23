import { Hono } from "hono";
import { logger } from "hono/logger";
import expenseRoute from "./routes/expenseRoute";
import { serveStatic } from "hono/bun";
// import { cors } from 'hono/cors'

const app = new Hono({ strict: false });
/*
Disabled strict matching for routes by setting `strict: false` to handle both with and without trailing slashes.
This ensures `/api/expense` and `/api/expense/` are treated as the same route.
*/

// app.use('/api/*', cors()) // added proxy in frontend

app.use("*", logger());
const apiRoutes = app.basePath("/api").route("/expenses", expenseRoute);

// app.use("*", serveStatic({ root: "../frontend/dist" }));
app.use(
  "*",
  serveStatic({
    root: "../frontend/dist",
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);
app.get("*", serveStatic({ path: "../frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
