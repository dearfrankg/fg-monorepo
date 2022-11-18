import { render, screen, waitFor, within, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "antd";

const options = [
  { label: "🐱", value: "cat" },
  { label: "🐶", value: "dog" },
];

const handleChange = jest.fn();

const resources = {
  renderSelect: (props = {}) => {
    return render(
      <Select
        data-testid="myselect"
        options={options}
        onChange={handleChange}
        multiple
        {...props}
      />
    );
  },

  waitForListOpen: async () => {
    await waitFor(() => {
      expect(
        screen.getByTestId("myselect").className.split(" ").includes("ant-select-open")
      ).toBeTruthy();
    });
  },

  clickOption: (optionText) => {
    const options = screen.getAllByText(optionText);
    console.log("options: ", options.length);
    const [option] = options;
    userEvent.click(option); //, undefined, { skipPointerEventsCheck: true });
    return option;
  },

  getSelectionByClickingOption: async (optionText) => {
    //
    // Open list
    //
    const select = screen.getByRole("combobox");
    userEvent.click(select);
    await waitForListOpen();
    const listbox = screen.getByRole("listbox");

    //
    // Click on option
    //
    const option = screen.getByText(optionText);
    console.log("clicking on: ", optionText);
    userEvent.click(option);
    await waitFor(() => {
      const [option] = document.querySelectorAll(".ant-select-item-option");
      expect(option).toBeDefined();
      expect(option).toHaveClass("ant-select-item-option-selected");
      const altOption = within(listbox).getByLabelText(optionText);
      expect(altOption).toBeDefined();
      expect(altOption.getAttribute("aria-selected")).toBe("true");
    });

    // const optionValue = optionText === "🐱" ? "cat" : "dog";
    // expect(handleChange).toHaveBeenCalledWith(optionValue, {
    //   label: optionText,
    //   value: optionValue,
    // });

    //
    // Close list
    //
    userEvent.click(select);

    //
    // Return selection
    //
    screen.debug(listbox);
    const options = within(listbox).getAllByRole("option");
    const names = [];
    for (let option of options) {
      if (option.getAttribute("aria-selected") === "true") {
        names.push(option.getAttribute("aria-label"));
      }
    }

    return names;
  },
};

const { renderSelect, waitForListOpen, clickOption, getSelectionByClickingOption } = resources;

describe("<Select />", () => {
  it("should return proper selection after clicking option", async () => {
    const { container } = renderSelect();

    let names;
    names = await getSelectionByClickingOption("🐱");
    // names = await getSelectionByClickingOption("🐶");
    expect(names).toEqual(["🐱"]);
  });
});
