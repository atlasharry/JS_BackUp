import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  // State variables to hold the input values for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Check if the user is already logged in by reading 'isLogin' from session storage
  const isLogin = sessionStorage.getItem("isLogin") === "true";

  // Handler function for the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend to login
      const response = await fetch(
        "http://localhost/YY_Music_JS/backend/index.php?action=login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON data from the response
      const data = await response.json();

      // Check if the login was successful and update the UI accordingly
      if (data.success) {
        console.log(data.message);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("isLogin", true);
        window.location.replace("/Createsong");
      } else {
        console.log(data.message);
        alert("Login failed," + data.message);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      alert("Login failed due to a network or server issue.");
    }
  };

  // Render the Login component
  return (
    // Check if the user is already logged in
    isLogin ? (
      // If user is logged in, display options to create a review or logout
      <div>
        <button
          onClick={() => {
            window.location.replace("/Createsong");
          }}
        >
          create review
        </button>
        <button
          onClick={() => {
            sessionStorage.removeItem("isLogin");
            //make sure to remove the username as well
            sessionStorage.removeItem("username");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    ) : (
      // If user is not logged in, display the login form
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <Link to="/register">
            <button type="button">Register</button>
          </Link>
        </form>
      </div>
    )
  );
}

export default Login;
