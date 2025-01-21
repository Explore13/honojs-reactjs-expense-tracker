import app from "./app";

Bun.serve({
  port: 8787,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log("Server running!!");
