import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders NotFound on unknown route", () => {
  render(
    <MemoryRouter initialEntries={["/this-route-does-not-exist"]}>
      <App />
    </MemoryRouter>
  );

  // Change this to whatever text your NotFound page actually shows
  // Example:
  // expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
