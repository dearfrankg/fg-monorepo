import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { server, rest } from "./mocks/server";
import MswOnline from "./msw-online";

test("fetch todos and render", async () => {
  render(<MswOnline />);
  const items = await waitFor(() => screen.getAllByRole("listitem"));
  expect(items.length).toBe(1);
});

test("fetch todos and render failed", async () => {
  server.use(
    rest.get("http://localhost:4000/todos", (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: "http error" }));
    })
  );
  render(<MswOnline />);
  const error = await waitFor(() => screen.getByRole("heading"));
  expect(error).toBeInTheDocument();
});
