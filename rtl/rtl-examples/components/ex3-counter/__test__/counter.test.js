import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Provider } from "react-redux";
import { makeStore, Counter } from "@/components/ex3-counter";

/*
 * EXAMPLE3: TEST state of the art redux with provider and store
 * SOURCE: https://redux.js.org/tutorials/quick-start
 */

const renderWrappedCounter = () => {
  const store = makeStore();

  render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

describe("ex3 <Counter /> --- uses @reduxjs/toolkit", () => {
  beforeEach(() => {
    renderWrappedCounter();
  });

  it("renders the component", () => {
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("decrements the value", async () => {
    await user.click(screen.getByRole("button", { name: /decrement value/i }));

    expect(screen.getByText("-1")).toBeInTheDocument();
  });

  it("increments the value", async () => {
    await user.click(screen.getByRole("button", { name: /increment value/i }));

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("increments by amount", async () => {
    await user.type(screen.getByLabelText(/set increment amount/i), "{backspace}5");
    await user.click(screen.getByRole("button", { name: /add amount/i }));

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("increments async", async () => {
    await user.type(screen.getByLabelText(/set increment amount/i), "{backspace}3");
    await user.click(screen.getByRole("button", { name: /add async/i }));

    expect(screen.findByText("3")).resolves.toBeInTheDocument();
  });
});
