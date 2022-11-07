import { render, screen } from "@testing-library/react";
import Header from "../Header";

/*
 * GetBy
 */

it("should render title prop found with getByText", () => {
  render(<Header title="My header" />);
  const headingElement = screen.getByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});
