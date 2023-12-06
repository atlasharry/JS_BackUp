// d.	Test and detect an incorrect value at least once.
// Test and detect for 1: short password. 2: password not match.
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Register from "./Register";

describe("Register form validation", () => {
  test("displays an error message for a short password", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Register" });

    // Simulate typing a short password
    await act(async () => {
      userEvent.type(passwordInput, "1234");
      fireEvent.click(submitButton);
    });

    // Check for an error message
    expect(
      screen.getByText("Password must be at least 10 characters long.")
    ).toBeInTheDocument();
  });

  test("displays an error message when passwords do not match", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmInput =
      screen.getByPlaceholderText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: "Register" });

    // Simulate typing a valid password and a different confirmation password
    await act(async () => {
      userEvent.type(passwordInput, "1234567890");
      userEvent.type(passwordConfirmInput, "12345678900");
      fireEvent.click(submitButton);
    });

    // Check for an error message
    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });
});
