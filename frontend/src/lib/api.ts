// import { type ApiRoutes } from "../../../server/app"; // added @server path into tsConfig.json and viteConfig.json
import { type ApiRoutes } from "@/server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
  await new Promise((r) => setTimeout(r, 2000)); // Hard-coded loading to display the skeleton loader
  const res = await api.me.$get();
  if (!res.ok) throw new Error("Unauthorized");
  const data = await res.json();
  console.log(data);
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
