import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "../mocks/server";
import DemoMsw from "..";
import { api } from "../mocks/handlers";

describe("msw (mock service worker)", () => {
  /*

  Test the scenario where we call the apis in this order:
  - getRootFolders()        // a,b,c
  - createRootFolders()     // d
  - getRootFolders()        // a,b,c,d

  */

  it("should chain distinct responses from a single route using server.use", async () => {
    render(<DemoMsw />);

    expect(screen.getByText(/loading/i));

    expect(await screen.findByTestId("folder-list")).toHaveTextContent("a,b,c");

    server.use(api.getFolders2);

    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      const [message] = Array.from(document.querySelectorAll(".ant-message-notice"));
      expect(message).toHaveTextContent(/folder successfully created/i);
      expect(screen.getByTestId("folder-list")).toHaveTextContent("a,b,c,d");
    });
  });
});
