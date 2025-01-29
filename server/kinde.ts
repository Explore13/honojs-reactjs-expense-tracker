import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { config } from "./config/config";
import { createFactory, createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: config.KINDE_DOMAIN,
    clientId: config.KINDE_CLIENT_ID,
    clientSecret: config.KINDE_CLIENT_SECRET,
    redirectURL: config.KINDE_REDIRECT_URI,
    logoutRedirectURL: config.KINDE_LOGOUT_REDIRECT_URI,
  }
);

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const isDev = config.NODE_ENV !== "production";
    console.log(`Setting cookie: ${key} = ${value}`);

    const cookieOptions = {
      httpOnly: true,
      secure: !isDev,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuthenticated = await kindeClient.isAuthenticated(
      sessionManager(c)
    );
    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const user = await kindeClient.getUserProfile(sessionManager(c));
    c.set("user", user);
    await next();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return c.json({ error: "Unauthorized" }, 401);
  }
});
