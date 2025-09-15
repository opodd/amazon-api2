import { Hono } from "hono";
import { handle } from "hono/vercel";
import routes from "../src/routes";
import graphql from "../src/graphql";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api");

app.route("/:country", routes);
app.route("/graphql", graphql);

app.onError((err, c) => {
  return c.json(
    {
      message: err.message,
    },
    {
      status: err instanceof HTTPException ? err.status : 500,
    }
  );
});

export default handle(app);