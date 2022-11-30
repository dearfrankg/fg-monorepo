import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DemoMessage from "..";

describe("<DemoMessage />", () => {
  it("", async () => {
    render(<DemoMessage />);

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      const [message] = Array.from(document.querySelectorAll(".ant-message-notice"));
      expect(message).toHaveTextContent(/we have liftoff/i);
    });
  });
});
