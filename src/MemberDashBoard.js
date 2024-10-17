import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemberDashBoard.css'; // Make sure to create and link this CSS file
import animeChar1 from './characters/anime_char_1.jpg';
import animeChar2 from './characters/anime_char_2.png';
import animeChar3 from './characters/anime_char_3.png';
import animeChar4 from './characters/anime_char_4.png';
import animeChar5 from './characters/anime_char_5.png';
import animeChar6 from './characters/anime_char_6.png';
import beachChar1 from './characters/beach_char_1.png';
import beachChar2 from './characters/beach_char_2.png';
import beachChar3 from './characters/beach_char_3.png';
import beachChar4 from './characters/beach_char_4.png';
import beachChar5 from './characters/beach_char_5.png';
import beachChar6 from './characters/beach_char_6.png';
import forestChar1 from './characters/forest_char_1.png';
import forestChar2 from './characters/forest_char_2.png';
import forestChar3 from './characters/forest_char_3.png';
import forestChar4 from './characters/forest_char_4.png';
import forestChar5 from './characters/forest_char_5.png';
import forestChar6 from './characters/forest_char_6.png';

const MemberDashBoard = ({selectedBackground}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/MemberAverageWorkingHours' , { state: { startDate, endDate } }); // Navigate to the desired route
    };

    return (
        <div className="dashboard-container">
            <h1>Team Dashboard</h1>
            <p>Choose Start and End date from the calendar to visualize your dedicated work time at that particular time range.</p>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button type="submit">Enter</button>
            </form>
            {selectedBackground === 'anime' && (
            <>
                <img 
                src={animeChar1} 
                alt="Anime Character 1" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '520px',
                    left: '500px',
                    transform: 'scale(2.5)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={animeChar2} 
                alt="Anime Character 2" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '200px',
                    left: '500px',
                    transform: 'scale(2)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={animeChar3} 
                alt="Anime Character 3" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '600px',
                    left: '775px',
                    transform: 'scale(1.8)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={animeChar4} 
                alt="Anime Character 4" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '190px',
                    left: '905px',
                    transform: 'scale(1.8)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={animeChar5} 
                alt="Anime Character 5" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '460px',
                    left: '900px',
                    transform: 'scale(2)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={animeChar6} 
                alt="Anime Character 6" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '200px',
                    left: '720px',
                    transform: 'scale(2)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
            </>
            )}
            {selectedBackground === 'beach' && (
            <>
                <img 
                src={beachChar1} 
                alt="Beach Character 1" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '530px',
                    left: '500px',
                    transform: 'scale(4)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={beachChar2} 
                alt="Beach Character 2" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '200px',
                    left: '500px',
                    transform: 'scale(3)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={beachChar3} 
                alt="Beach Character 3" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '580px',
                    left: '775px',
                    transform: 'scale(1.8)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={beachChar4} 
                alt="Beach Character 4" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '200px',
                    left: '905px',
                    transform: 'scale(1.8)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={beachChar5} 
                alt="Beach Character 5" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '480px',
                    left: '900px',
                    transform: 'scale(2)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={beachChar6} 
                alt="Beach Character 6" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '180px',
                    left: '720px',
                    transform: 'scale(2)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
            </>
            )}
            {selectedBackground === 'forest' && (
            <>
                <img 
                src={forestChar1} 
                alt="Forest Character 1" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '530px',
                    left: '500px',
                    transform: 'scale(2.5)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={forestChar2} 
                alt="Forest Character 2" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '180px',
                    left: '500px',
                    transform: 'scale(3)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={forestChar3} 
                alt="Forest Character 3" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '580px',
                    left: '775px',
                    transform: 'scale(2.5)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={forestChar4} 
                alt="Forest Character 4" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '200px',
                    left: '905px',
                    transform: 'scale(1.8)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={forestChar5} 
                alt="Forest Character 5" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '480px',
                    left: '900px',
                    transform: 'scale(3)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={forestChar6} 
                alt="Forest Character 6" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '180px',
                    left: '720px',
                    transform: 'scale(2)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
            </>
            )}
        </div>
    );
};

export default MemberDashBoard;
