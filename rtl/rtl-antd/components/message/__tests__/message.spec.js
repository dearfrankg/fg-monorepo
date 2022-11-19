import { act, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { message } from "antd";
import DemoMessage from "..";

describe("<DemoMessage />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();

    act(() => {
      message.destroy();
    });
  });

  it("", async () => {
    render(<DemoMessage />);

    fireEvent.click(screen.getByRole("button"));

    let message;
    await waitFor(() => {
      [message] = Array.from(document.querySelectorAll(".ant-message-notice"));
      expect(message).toHaveTextContent(/we have liftoff/i);
    });
  });
});
