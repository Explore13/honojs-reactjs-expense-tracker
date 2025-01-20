import app from "./app";

Bun.serve({
  port: 8787,
  fetch: app.fetch,
});

console.log("Server running!!");
