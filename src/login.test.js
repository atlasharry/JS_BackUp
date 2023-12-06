import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Login from "./login";

// Define the test
test("clicking on the Register link navigates to the Register page", () => {
  // Render the Login component within a BrowserRouter
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Find the link that navigates to the Register page
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
  // Simulate a click on the Register link
  fireEvent.click(linkElement);
  expect(window.location.pathname).toBe("/register");
});
