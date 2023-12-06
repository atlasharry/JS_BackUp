import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./Register";
import Viewsong from "./Viewsong";
import Songdisplay from "./Songdisplay.js";
import Updatesong from "./Updatesong";
import Deletesong from "./Deletesong";
import Createsong from "./Createsong";

// Main App component
function App() {
  // Fetching the logged-in username from the session storage
  const username = sessionStorage.getItem("username");

  // Styling for the main App container
  const appstyle = {
    position: "absolute",
    top: "3%",
    left: "10%",
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexdirection: "row",
  };

  // Styling for the song display section
  const songDisplayStyle = {
    flex: "0 0 70%",
  };

  // Styling for the routes (pages) container section
  const routeContainerStyle = {
    flex: "0 0 20%",
  };

  // Rendering the App component
  return (
    // React Router to handle different routes or paths
    <Router>
      <div className="App" style={appstyle}>
        <div style={songDisplayStyle}>
          <Songdisplay />
        </div>

        <div style={routeContainerStyle}>
          <p>Welcome {username}</p>

          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Viewsong/:id" element={<Viewsong />}></Route>
            <Route path="/Createsong" element={<Createsong />}></Route>
            <Route path="/Updatesong/:id" element={<Updatesong />}></Route>
            <Route path="/Deletesong/:id" element={<Deletesong />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

// General Logic for switching between sections
// Login / Reigster Logic
// Main view / Create Song Logic

// The Link to each individual page will be managed down in the View function itself.
// View / Update / Delete
