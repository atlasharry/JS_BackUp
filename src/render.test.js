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
import fetchMock from "jest-fetch-mock";
import { act } from "react-dom/test-utils";

// Rendering test for the login page
test("Register Login", () => {
  render(
    <BrowserRouter>
      <Login />
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

// Createsong
describe("Createsong Render Test", () => {
  test("Createsong Rendering", async () => {
    render(
      <BrowserRouter>
        <Createsong />
      </BrowserRouter>
    );

    expect(screen.getByText("Create Review")).toBeInTheDocument();
    expect(
      screen.getByText("Here you can create your review.")
    ).toBeInTheDocument();
    expect(screen.getByText("Artist:")).toBeInTheDocument();
    expect(screen.getByText("Song:")).toBeInTheDocument();
    expect(screen.getByText("Rating:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();

    expect(screen.getByPlaceholderText("artist")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("song_name")).toBeInTheDocument();
  });
});

// Viewsong
describe("Viewsong Render Test", () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true,
        song_info: ["artist1", "song1", 3],
      })
    );
  });

  test("Viewsong Rendering", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Viewsong />
        </BrowserRouter>
      );
    });

    // Check if the correct data is displayed
    expect(screen.getByText("artist1")).toBeInTheDocument();
    expect(screen.getByText("song1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

// Update Song
describe("Update Song Render Test", () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true,
        song_info: ["artist2", "song2", 4],
      })
    );
  });

  test("Updatesong Rendering", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Updatesong />
        </BrowserRouter>
      );
    });

    // Check if the correct data is displayed
    expect(screen.getByDisplayValue("artist2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("song2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
  });
});

// Delete Song
describe("Delete Song Render Test", () => {
  test("Deletesong Rendering", async () => {
    render(
      <BrowserRouter>
        <Deletesong />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });
});

// Songdisplay
describe("Songdisplay Render Test", () => {
  fetchMock.enableMocks();

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify([
        {
          id: 1,
          username: "user1",
          artist: "artist1",
          song: "song1",
          rating: 3,
        },
        {
          id: 2,
          username: "user2",
          artist: "artist2",
          song: "song2",
          rating: 4,
        },
      ])
    );
  });

  test("Songdisplay Rendering", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Songdisplay />
        </BrowserRouter>
      );
    });

    expect(screen.getByText("artist1")).toBeInTheDocument();
    expect(screen.getByText("artist3")).toBeInTheDocument();
    expect(screen.getByText("song1")).toBeInTheDocument();
    expect(screen.getByText("song2")).toBeInTheDocument();
  });
});
