import { rest } from "msw";
import { setupServer } from "msw/node";
import userData from "./__mocks__/userData.json";

const server = setupServer(
  rest.get("https://randomuser.me/api", (req, res, ctx) => {
    // console.log("req: ", req.url.toString());

    return res(ctx.status(200), ctx.json(userData));
  }),

  rest.get("*", (req, res, ctx) => {
    return res(ctx(500), ctx.json({ error: "Please add request handler" }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
