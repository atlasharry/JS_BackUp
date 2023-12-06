import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineZoomIn,
  AiFillStar,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function Songdisplay() {
    // State variables for sorting, songs list, search term, and minimum rating filter
    const [sortOrder, setSortOrder] = useState("default");
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minRating, setMinRating] = useState(0);
    // Fetching the username from the session storage
    const username = sessionStorage.getItem("username");

    // Styles for sortable header and its hover state
    const sortableHeaderStyles = {
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    };

    const sortableHeaderHoverStyles = {
    color: "orange",
    };

    const [isHovered, setIsHovered] = useState(false);

    const iconstyle = {
    display: "flex",
    alignItems: "left",
    flexdirection: "row",
    };

    // useEffect hook to fetch songs from the backend when the component mounts
    useEffect(() => {
    async function fetchData() {
        try {
        const response = await fetch(
            "http://localhost/YY_Music_JS/backend/index.php?action=getRatings",
            {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            }
        );
        const data = await response.json();
        setSongs(data);
        } catch (error) {
        console.error(
            "There was a problem with the fetch operation:",
            error.message
        );
        alert("Failed due to a network or server issue.");
        }
    }
    fetchData();
    }, []);

    // Helper function to render the stars for song ratings
    const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => <AiFillStar key={index} />);
    };

    // Handle the sorting of songs based on rating
    const handleSort = () => {
    switch (sortOrder) {
        case "default":
        setSortOrder("desc");
        break;
        case "desc":
        setSortOrder("asc");
        break;
        case "asc":
        setSortOrder("default");
        break;
        default:
        setSortOrder("default");
        break;
    }
    };

    // Sort the songs based on the selected order
    let sortedSongs = [...songs];
    switch (sortOrder) {
    case "desc":
        sortedSongs.sort((a, b) => b.rating - a.rating);
        break;
    case "asc":
        sortedSongs.sort((a, b) => a.rating - b.rating);
        break;
    case "default":
        sortedSongs.sort((a, b) => a.id - b.id);
        break;
    default:
        break;
    }

    // Filter songs based on search term and minimum rating
    const filteredSongs = sortedSongs.filter((song) => {
    const term = searchTerm.toLowerCase();
    return (
        (song.id.toString().includes(term) ||
        song.username.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term) ||
        song.song.toLowerCase().includes(term)) &&
        (minRating === 0 ? song.rating >= minRating : song.rating === minRating)
    );
    });

    // Render the Songdisplay component
    return (
    <div>
        <h1>YY-Music</h1>
        <h2>Song Ratings</h2>

        <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
        value={minRating}
        onChange={(e) => setMinRating(Number(e.target.value))}
        >
        <option value="0">All Ratings</option>
        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>
        </select>

        <table>
        <thead>
            <tr>
            <td> ID </td>
            <td> Username </td>
            <td> Artist </td>
            <td> Song </td>
            <td
                onClick={handleSort}
                className="sortableHeader"
                style={
                isHovered
                    ? { ...sortableHeaderStyles, ...sortableHeaderHoverStyles }
                    : sortableHeaderStyles
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Rating
                <FaArrowUp
                style={{ color: sortOrder === "asc" ? "salmon" : "grey" }}
                />
                <FaArrowDown
                style={{ color: sortOrder === "desc" ? "salmon" : "grey" }}
                />
            </td>

            <td> Action </td>
            </tr>
        </thead>
        <tbody>
            {filteredSongs.map((song) => (
            <tr key={song.id}>
                <td>{song.id}</td>
                <td>{song.username}</td>
                <td>{song.artist}</td>
                <td>{song.song}</td>
                <td>{renderStars(song.rating)}</td>
                <td>
                <div style={iconstyle}>
                    <Link to={`/ViewSong/${song.id}`} title="View Song">
                    <AiOutlineZoomIn />
                    </Link>
                    {username && username === song.username && (
                    <div>
                        <Link to={`/UpdateSong/${song.id}`} title="Update Song">
                        <AiOutlineEdit />
                        </Link>
                        <Link to={`/DeleteSong/${song.id}`} title="Delete Song">
                        <AiOutlineDelete />
                        </Link>
                    </div>
                    )}
                </div>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
}

export default Songdisplay;
