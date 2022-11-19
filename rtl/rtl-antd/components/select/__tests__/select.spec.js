import { render, screen, waitFor, within, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DemoSelect from "../select";

describe("<Select />", () => {
  it("should return proper selection after clicking option", async () => {
    render(<DemoSelect />);

    // open list
    userEvent.click(screen.getByRole("combobox"));
    expect(await screen.findByRole("listbox")).toBeDefined();

    // click option
    const [option1, option2] = Array.from(document.querySelectorAll(".ant-select-item-option"));
    userEvent.click(option1);

    // confirm selection
    await waitFor(() => {
      const [option1, options2] = Array.from(document.querySelectorAll(".ant-select-item-option"));
      expect(option1.getAttribute("aria-selected")).toBe("true");
      expect(option1.getAttribute("title")).toBe("🐱");
      expect(options2.getAttribute("aria-selected")).toBe("false");
      expect(options2.getAttribute("title")).toBe("🐶");
      expect(screen.getByTestId("selection")).toHaveTextContent(`["🐱"]`);
    });

    userEvent.click(option2);

    await waitFor(() => {
      const [option1, options2] = Array.from(document.querySelectorAll(".ant-select-item-option"));
      expect(option1.getAttribute("aria-selected")).toBe("true");
      expect(option1.getAttribute("title")).toBe("🐱");
      expect(options2.getAttribute("aria-selected")).toBe("true");
      expect(options2.getAttribute("title")).toBe("🐶");
      expect(screen.getByTestId("selection")).toHaveTextContent(`["🐱","🐶"]`);
    });
  });
});
