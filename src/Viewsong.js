import React, { useState, useEffect } from 'react';  // Import useEffect
import { useParams, Link } from 'react-router-dom';

// fetch from the php
async function query_song_info(song_id) {

    try {
        // Fetch song details from the backend
        const response = await fetch('http://localhost/YY_Music_JS/backend/index.php?action=viewSong', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ song_id: song_id })
        });
        
        // Check if response is OK, if not throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        if (data.success) {
            console.log("view song loaded");
            return(data.song_info);
        } else {
            console.log(data.message);
            alert("Data loading failed");
        }

    } catch(error) {
        console.error("Problem fetching data", error.message);
        alert("Access View failed due to some problems.");
    }


    return (
        (null)
    );
}


// Viewsong component to display song details
function Viewsong() {
    // Fetching song id from the URL using useParams hook
    const { id } = useParams();

    // State variable to hold the fetched song information 
    const [songInfo, setSongInfo] = useState(null);
    const username = sessionStorage.getItem('username');

    // useEffect hook to fetch the song information when the component mounts
    useEffect(() => {
        const fetchSongInfo = async () => {
            const data = await query_song_info(id);
            setSongInfo(data);
        };
        
        fetchSongInfo();
    }, [id]);

    // Render the Viewsong component
    if (!songInfo) {
        return (
            <div>
                <p>Loading...</p>
                <Link to={`/`}>Back to lobby</Link>
            </div>
        );
    } else {
        return (
            <div>
                <b>Username:</b>
                <h2>{username}</h2>
                <b>Artist:</b>
                <h2>{songInfo[0]}</h2>
                <b>Song:</b>
                <h2>{songInfo[1]}</h2>
                <b>Rating:</b>
                <h2>{songInfo[2]}</h2>
                <br/>
                <br/>
                <br/>
                <Link to={`/`}>Back to lobby</Link>
            </div>
        );
    }

    
}

export default Viewsong;


