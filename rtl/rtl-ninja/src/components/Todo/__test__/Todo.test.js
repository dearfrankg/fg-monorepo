import { fireEvent, render, screen } from "@testing-library/react";
import Todo from "../Todo";
import { BrowserRouter } from "react-router-dom";

const MockTodo = ({ numberOfIncompleteTasks }) => (
  <BrowserRouter>
    <Todo />
  </BrowserRouter>
);

const addTask = (tasks) => {
  const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
  const buttonElement = screen.getByRole("button", { name: /Add/i });
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.click(buttonElement);
  });
};

describe("Todo", () => {
  it("should add one task", () => {
    render(<MockTodo />);
    addTask(["Go shopping"]);
    const divElement = screen.getByText(/Go shopping/i);
    expect(divElement).toBeInTheDocument();
  });

  it("should add many tasks", () => {
    render(<MockTodo />);
    addTask(["Go shopping", "jump", "freak out"]);
    const divElements = screen.getAllByTestId(/task/i);
    expect(divElements.length).toBe(3);
  });

  it("should not have completed class on intial render", () => {
    render(<MockTodo />);
    addTask(["Go shopping"]);
    const divElement = screen.getByTestId(/task/i);
    expect(divElement).not.toHaveClass("todo-item-active");
  });

  it("should have completed class after click", () => {
    render(<MockTodo />);
    addTask(["Go shopping"]);
    const divElement = screen.getByTestId(/task/i);
    fireEvent.click(divElement);
    expect(divElement).toHaveClass("todo-item-active");
  });
});
