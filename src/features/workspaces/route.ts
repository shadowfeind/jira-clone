import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "./schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_BUCKER_ID, WORKSPACE_ID } from "@/config";
import { ID } from "node-appwrite";

// do not put comma at the end of the middleware
const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID);

    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");

      const { name, image } = c.req.valid("form");
      let uploadedImgUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKER_ID,
          ID.unique(),
          image
        );

        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKER_ID,
          file.$id
        );

        uploadedImgUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }
      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACE_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImgUrl,
        }
      );

      return c.json({ data: workspace });
    }
  );

export default app;
