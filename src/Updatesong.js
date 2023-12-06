import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

function Updatesong() {
    // Fetching song id from URL using useParams hook
    const { id } = useParams();
    // State variables to hold the song information and form inputs
    const [song_artist, setArtistname] = useState('');
    const [song_name, setSongname] = useState('');
    const [song_rating, setRating] = useState('');
    const username = sessionStorage.getItem('username');
    
    const [songInfo, setSongInfo] = useState(null);
    
    // useEffect hook to fetch the song information when the component mounts
    useEffect(() => {
        const fetchSongInfo = async () => {
            const data = await query_song_info(id);
            setSongInfo(data);
            if (data) {
                setArtistname(data[0]);
                setSongname(data[1]);
                setRating(data[2]);
            }
        };
        fetchSongInfo();
    }, [id]);
    
    
    // Function to fetch song information from backend
    async function query_song_info(song_id) {
        let song_info = '';
        try {
            const response = await fetch('http://localhost/YY_Music_JS/backend/index.php?action=viewSong', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ song_id })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // from the backend: 
            // data.success, data.info.
            const data = await response.json();
            if (data.success) {
                console.log("view song loaded");
                console.log(data.song_info);
                song_info = data.song_info;
            } else {
                console.log(data.message);
                alert("Data loading failed");
            }
    
        } catch(error) {
            console.error("Problem fetching data", error.message);
            alert("Access View failed due to some problems.");
        }
    
    
        return (
            song_info
        );
    }

    // Handler function for the update form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (song_artist === '' || song_name === '' || song_rating === '') {
                alert("Please fill in all the blanks");
                return;
            } 
            console.log(id);
            console.log(username);
            console.log(song_artist);
            console.log(song_name);
            console.log(song_rating);
            const response = await fetch('http://localhost/YY_Music_JS/backend/index.php?action=updateSong', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, username, song_artist, song_name, song_rating })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // const responseText = await response.text();
            // console.log(responseText);

            // from the backend: 
            // data.success, data.info.
            const data = await response.json();
            if (data.success) {
                console.log("Update success");
                window.location.replace('/Createsong');
            } else {
                console.log(data.message);
                alert("Update fail failed");
            }

        } catch(error) {
            console.error("Problem fetching data", error.message);
            alert("Update Data failed due to some problems.");
        }
    }

    // Render the Updatesong component
    if (!songInfo) {
        return (
            <div>
                <p>Loading...</p>
                <Link to={`/`}>Back to lobby</Link>
            </div>
        )
    } else {
        return ( 
            <div>
                <h1>Update Song</h1>
                <b>Here you can update your ratings.</b>
                <br />
                <form onSubmit={handleSubmit}>
                    <b>Artist:</b>
                    <input
                        type="text"
                        name="artist"
                        value={song_artist} // Assuming you have a state variable named artist
                        onChange={(e) => setArtistname(e.target.value)}
                    />
                    <b>Song:</b>
                    <input
                        type="text"
                        name="song"
                        value={song_name} // Assuming you have a state variable named song
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
                    <Link to={`/Createsong`}>Back to lobby</Link>
                </form>
            </div>
        );
    }
        
}

export default Updatesong;