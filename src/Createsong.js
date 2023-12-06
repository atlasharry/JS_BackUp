import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Createsong() {
    // Fetch the username from the session storage
    const username = sessionStorage.getItem('username');  

    // State variables to hold the input values for song artist, name, and rating
    const [song_artist, setArtistname] = useState('');
    const [song_name, setSongname] = useState('');
    const [song_rating, setRating] = useState('');  
    
    // Handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // Basic validation to ensure all fields are filled
            if (song_artist === '' || song_name === '' || song_rating === '') {
                alert("Please fill in all the blanks");
                return;
            }

            // Make a POST request to the backend to create the song
            const response = await fetch('http://localhost/YY_Music_JS/backend/index.php?action=createSong', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, song_artist, song_name, song_rating })
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            // Parse the JSON data from the response
            const data = await response.json();
            // Check if the song creation was successful and update the UI accordingly
            if (data.success) {
                console.log("Update success");
                window.location.replace('/Createsong');

            } else {    
                console.log(data.message);
                alert("Create failed, avoid duplicate review");
            }

        } catch(error) {
            // Handle any errors that occurred during the fetch
            console.error("Problem fetching data", error.message);
            alert("Create review failed due to some problems.");
        }
    }
    // Render the Createsong component
    return ( 
        <div>
            <Link onClick={() => {
                    sessionStorage.removeItem('isLogin');
                    //make sure to remove the username as well
                    sessionStorage.removeItem('username');
                    window.location.replace('/');
                }}>
                    Logout
            </Link>
            <h1>Create Review</h1>
            <b>Here you can create your review.</b>
            <br />
            <form onSubmit={handleSubmit}>
                <b>Artist:</b>
                <input
                    type="text"
                    name="artist"
                    value={song_artist}
                    placeholder="artist"
                    onChange={(e) => setArtistname(e.target.value)}
                />
                <b>Song:</b>
                <input
                    type="text"
                    name="song"
                    value={song_name} // Assuming you have a state variable named song
                    placeholder="song_name"
                    onChange={(e) => setSongname(e.target.value)}
                />
                <b>Rating:</b>
                <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={song_rating} // Assuming you have a state variable named rating
                    onChange={(e) => setRating(e.target.value)}
                />
                <input type="submit" name="submit" value="Submit" />
            </form>
        </div>
    );
    
        
}

export default Createsong;