// import { type ApiRoutes } from "../../../server/app"; // added @server path into tsConfig.json and viteConfig.json
import { type ApiRoutes } from "@server/app";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client.api;