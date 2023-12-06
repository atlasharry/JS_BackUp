import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
    // Fetching the dynamic 'id' from the URL using react-router's useParams hook
    const { id } = useParams();
    // Fetching the username from the session storage
    const username = sessionStorage.getItem('username');

    // Handler function for the form submission 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the backend to delete the song
            const response = await fetch('http://localhost/YY_Music_JS/backend/index.php?action=deleteSong', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, username })
            });
            
            // Parse the JSON data from the response
            const data = await response.json();
            
            // Check if the song deletion was successful and update the UI accordingly
            if (data.success) {
                // alert("detele completed");
                window.location.replace('/Createsong');
            } else {
                alert("delete failed, you can only delete your own review");
                window.location.replace('/Createsong');
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error.message);
            console.log(error);
            alert("Song delete failed due to a network or server issue.");
        }
    };
    
    // Render the Register component
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Are you sure that you wanna delete this review?</p>
                <button type="submit">Delete</button>
            </form>
            <p><Link to="/Createsong">Back to Lobby</Link></p>
        </div>
    );
}

export default Register;
