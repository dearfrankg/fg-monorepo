import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Greet from "@/components/ex2-greet";

/*
 * ex2 greet - uses msw and useRedux
 * SOURCE: testing library react example:
 * https://testing-library.com/docs/react-testing-library/example-intro
 */

describe("ex2 <Greet /> --- uses msw and useReducer", () => {
  const server = setupServer(
    rest.get("/greeting", (_req, res, ctx) => {
      return res(ctx.json({ greeting: "hello there" }));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("msw works with axios", () => {
    test("click load with axios button, success renders greeting", async () => {
      render(<Greet url="/greeting" />);

      fireEvent.click(screen.getByText("Load greeting with axios"));
      await screen.findByRole("heading", { name: /hello there/i });

      expect(screen.getAllByRole("heading")[1]).toHaveTextContent("hello there");
      expect(screen.getAllByRole("button")[0]).toBeDisabled();
    });

    test("click load with axios button, failure renders error", async () => {
      server.use(
        rest.get("/greeting", (_req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      render(<Greet url="/greeting" />);
      fireEvent.click(screen.getByText("Load greeting with axios"));
      await screen.findByRole("alert");

      expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to get greeting");
      expect(screen.getAllByRole("button")[0]).not.toBeDisabled();
    });
  });

  describe("msw works with fetch", () => {
    test("click load with fetch button, success renders greeting", async () => {
      render(<Greet url="/greeting" />);

      fireEvent.click(screen.getByText("Load greeting with fetch"));
      await screen.findByRole("heading", { name: /hello there/i });

      expect(screen.getAllByRole("heading")[1]).toHaveTextContent("hello there");
      expect(screen.getAllByRole("button")[1]).toBeDisabled();
    });

    test("click load with fetch button, failure renders error", async () => {
      server.use(
        rest.get("/greeting", (_req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      render(<Greet url="/greeting" />);
      fireEvent.click(screen.getByText("Load greeting with fetch"));
      await screen.findByRole("alert");

      expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to get greeting");
      expect(screen.getAllByRole("button")[1]).not.toBeDisabled();
    });
  });
});
