import { fireEvent, render, screen } from "@testing-library/react";
import FollowersList from "../FollowersList";
import { BrowserRouter } from "react-router-dom";
import { server, rest } from "../../../testServer";

const MockFollowersList = () => (
  <BrowserRouter>
    <FollowersList />
  </BrowserRouter>
);

describe("FollowersList", () => {
  it("should find the first follower", async () => {
    render(<MockFollowersList />);
    const followerDiv = await screen.findByTestId("follower-item-0");
    expect(followerDiv).toBeInTheDocument();
  });

  it("should find 5 followers", async () => {
    render(<MockFollowersList />);
    const followerDivs = await screen.findAllByTestId(/follower-item/i);
    expect(followerDivs.length).toBe(5);
  });

  it("should not find follower when error", async () => {
    server.use(
      rest.get("https://randomuser.me/api", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<MockFollowersList />);
    const followerDiv = await screen.queryByTestId("follower-item-0");
    expect(followerDiv).not.toBeInTheDocument();
  });
});
