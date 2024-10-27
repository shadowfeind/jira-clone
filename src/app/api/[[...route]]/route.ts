import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspace from "@/features/workspaces/route";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => c.json({ message: "nicela" }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/auth", auth).route("/workspaces", workspace);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);

export type AddType = typeof routes;
