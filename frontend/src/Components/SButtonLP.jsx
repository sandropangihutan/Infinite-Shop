import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../assets/css/sbLP.css'; // Import file CSS yang berisi animasi swipe

function SButtonLP() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleClick = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <button className="swipe up" type="button" onClick={handleClick}>
            <span className="text">SHOP NOW</span>
        </button>
    );
}

export default SButtonLP;
