import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TeamDashBoard.css'; // Make sure to create and link this CSS file
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

const TeamDashboard = ({selectedBackground}) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Start Date:', startDate, 'End Date:', endDate);
    
        try {
            const response = await axios.get(`http://localhost:5000/time`, {
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            });
            console.log(response.data);
            // Optionally store this data in state or pass it to another component for visualization
            navigate('/TeamAverageWorkingHours', { state: {startDate, endDate, timeLogs: response.data } });
        } catch (error) {
            console.error('Failed to fetch time logs:', error);
        }
    };    

    return (
        <div className="dashboard-container">
            <h1>Team Dashboard</h1>
            <p>Choose Start and End date from the calendar to visualize team members who work at that particular time range.</p>
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
                        top: '100px',
                        left: '350px',
                        transform: 'scale(2)',
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
                        top: '150px',
                        left: '550px',
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
                        top: '150px',
                        left: '160px',
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
                        top: '150px',
                        left: '1100px',
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
                        top: '150px',
                        left: '1280px',
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
                        top: '150px',
                        left: '900px',
                        transform: 'scale(2.5)',
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
                        top: '130px',
                        left: '330px',
                        transform: 'scale(3)',
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
                        top: '130px',
                        left: '530px',
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
                        top: '130px',
                        left: '130px',
                        transform: 'scale(2)',
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
                        top: '130px',
                        left: '1100px',
                        transform: 'scale(2.5)',
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
                        top: '130px',
                        left: '1280px',
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
                        top: '130px',
                        left: '900px',
                        transform: 'scale(2.5)',
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
                        top: '130px',
                        left: '330px',
                        transform: 'scale(3)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar2} 
                    alt="Beach Character 2" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '130px',
                        left: '510px',
                        transform: 'scale(3)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar3} 
                    alt="Beach Character 3" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '130px',
                        left: '130px',
                        transform: 'scale(2.5)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar4} 
                    alt="Beach Character 4" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '130px',
                        left: '1100px',
                        transform: 'scale(2.5)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar5} 
                    alt="Beach Character 5" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '130px',
                        left: '1280px',
                        transform: 'scale(3)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar6} 
                    alt="Beach Character 6" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '130px',
                        left: '900px',
                        transform: 'scale(2.5)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                />
            </>
            )}
        </div>
    );
};

export default TeamDashboard;
