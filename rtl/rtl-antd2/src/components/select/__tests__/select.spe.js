import { render, screen, waitFor, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DemoSelect from "@/components/select";

describe("<Select />", () => {
  it("should be controllable using keyboard", async () => {
    render(<DemoSelect />);

    const select = screen.getByRole("combobox");

    fireEvent.mouseDown(select);

    expect(await screen.findByText("🐶")).toBeVisible();

    // const option = within(listbox).getByLabelText("🐶");
    // screen.debug(option);

    // userEvent.mouseDown(option, undefined, { skipPointerEventsCheck: true });

    // const selection = await screen.findByTestId("selection");
    // expect(selection).toHaveTextContent(`["🐶"]`);
  });
  it("should be controllable using mouse clicks", () => {});
});
