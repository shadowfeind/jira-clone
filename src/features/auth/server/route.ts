import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schemas";

const app = new Hono().post(
  "/login",
  zValidator("json", loginSchema),
  async (c) => {
    // we have valid as we are using zValidator
    const { email, password } = c.req.valid("json");
    return c.json({ email, password });
  }
);

export default app;
