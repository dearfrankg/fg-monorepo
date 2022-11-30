import { render, screen } from "@testing-library/react";
import Home from "@/components/ex1-home";

/*
 * EXAMPLE1: TEST snapshot and getByRole
 * SOURCE: nextjs example: `npx create-next-app --example with-jest <app_name>`
 */
describe("ex1 <Home /> --- uses jest snapshots", () => {
  it("rendering component matches snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it("rendering component has specific header", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /React Testing Library Examples/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
