import { Hono } from "hono";
import { kindeClient, sessionManager } from "../kinde";

const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/callback", async (c) => {
    // get called every time we login or register
    try {
      const url = new URL(c.req.url);
      console.log(url);
      
      const res = await kindeClient.handleRedirectToApp(sessionManager(c), url);
      console.log(res);
      
      return c.redirect("/");
    } catch (error) {
      console.log(error);
      return c.json({
        error: "An error occurred during the callback process.",
      });
    }
  })
  .get("/me", async (c) => {
    const isAuthenticated = await kindeClient.isAuthenticated(
      sessionManager(c)
    );
    if (!isAuthenticated) {
      // Need to implement, e.g: call an api, etc...
      return c.json({ error: "Unauthorized" }, 401);
    }
    const user = await kindeClient.getUserProfile(sessionManager(c));
    return c.json({ user });
  });
export default authRoute;
