import { Hono } from "hono";
import { getUser, kindeClient, sessionManager } from "../kinde";

const authRoute = new Hono()
  .get("/login", async (c) => {
    try {
      const loginUrl = await kindeClient.login(sessionManager(c));
      return c.redirect(loginUrl.toString());
    } catch (error) {
      console.error("Login error:", error);
      return c.json({ error: "Failed to generate login URL." }, 500);
    }
  })
  .get("/register", async (c) => {
    try {
      const registerUrl = await kindeClient.register(sessionManager(c));
      return c.redirect(registerUrl.toString());
    } catch (error) {
      console.error("Register error:", error);
      return c.json({ error: "Failed to generate register URL." }, 500);
    }
  })
  .get("/logout", async (c) => {
    try {
      const logoutUrl = await kindeClient.logout(sessionManager(c));
      return c.redirect(logoutUrl.toString());
    } catch (error) {
      console.error("Logout error:", error);
      return c.json({ error: "Failed to log out." }, 500);
    }
  })
  .get("/callback", async (c) => {
    try {
      const url = new URL(c.req.url);
      await kindeClient.handleRedirectToApp(sessionManager(c), url);
      return c.redirect("/");
    } catch (error) {
      console.error("Callback error:", error);
      return c.json(
        { error: "An error occurred during the callback process." },
        500
      );
    }
  })
  .get("/me", getUser, async (c) => {
    try {
      const user = c.var.user;
      if (!user) return c.json({ error: "Unauthorized" }, 401);
      return c.json({ user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return c.json({ error: "Failed to fetch user profile." }, 500);
    }
  });

export default authRoute;
