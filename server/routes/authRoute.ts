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
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/me", async (c) => {
    const isAuthenticated = await kindeClient.isAuthenticated(
      sessionManager(c)
    );
    return c.json({ isAuthenticated });
    if (isAuthenticated) {
      // Need to implement, e.g: call an api, etc...
    } else {
      // Need to implement, e.g: redirect user to sign in, etc..
    }
  });

export default authRoute;
