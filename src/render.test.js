import React from "react";
// The React testing library simulates the DOM.
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./login";
import Register from "./Register";
import Viewsong from "./Viewsong";
import Songdisplay from "./Songdisplay.js";
import Updatesong from "./Updatesong";
import Deletesong from "./Deletesong";
import Createsong from "./Createsong";
import { BrowserRouter } from "react-router-dom";
// The jest-dom lets you analyze the rendered simulation.
import "@testing-library/jest-dom";

// Rendering test for the register page
test("Register Login", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const registerButton = screen.getByRole("button", { name: /Register/i });

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(registerButton).toBeInTheDocument();
});

// Rendering test for the register page
test("Register Rendering", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
});
