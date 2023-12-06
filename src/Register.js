import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register() {
  // State variables to hold the input values for username, password, confirmation password, and messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  // If a user is already logged in and requests the registration page, they should be redirected
  // to the index page with the overview of all rated songs.
  useEffect(() => {
    const loggedInUsername = sessionStorage.getItem("username");
    if (loggedInUsername) {
      window.location.replace("/");
    }
  }, []);

  // Handler function for the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for password length and password confirmation
    if (password.length < 10) {
      setMessage("Password must be at least 10 characters long.");
      return;
    }
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // Make a POST request to the backend to register the new user
      const response = await fetch(
        "http://localhost/YY_Music_JS/backend/index.php?action=register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      // Parse the JSON data from the response
      const data = await response.json();

      // Check if the registration was successful and update the UI accordingly
      if (data.success) {
        alert("Registration successful, please login");
        window.location.replace("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      setMessage("Registration failed due to a network or server issue.");
    }
  };

  // Render the Register component
  return (
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
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Already have an account? <Link to="/">Login here!</Link>
      </p>
    </div>
  );
}

export default Register;
