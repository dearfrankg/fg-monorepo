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
    return render(<Select options={options} onChange={handleChange} multiple {...props} />);
  },

  getSelectionByClickingOption: async (optionText) => {
    const select = screen.getByRole("combobox");

    userEvent.click(select);

    const options = await screen.findAllByText(optionText);
    const option = options[0];

    userEvent.click(option); //, undefined, { skipPointerEventsCheck: true });
    await waitFor(() => {
      const optionValue = optionText === "🐱" ? "cat" : "dog";
      expect(handleChange).toHaveBeenCalledWith(optionValue, {
        label: optionText,
        value: optionValue,
      });
    });

    let selection;
    await waitFor(() => {
      selection = document.querySelectorAll(".ant-select-selection-item");
    });

    userEvent.click(select);

    return [...selection].map((item) => item.getAttribute("title"));
  },
};

const { renderSelect, getSelectionByClickingOption } = resources;

describe("<Select />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("demo example", async () => {
    renderSelect();

    let names;
    names = await getSelectionByClickingOption("🐱");
    console.log("names: ", names);
    // names = await getSelectionByClickingOption("🐶");
    // console.log("names: ", names);
  });
});
