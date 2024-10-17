import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './History.css';
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

const HistoryLog = ({selectedBackground}) => {
    const [historyLogs, setHistoryLogs] = useState([]);  // State to store the logs
    const [loading, setLoading] = useState(true);  // State to manage loading
    const navigate = useNavigate();

    // Fetch the logs when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/history/')
            .then(response => {
                setHistoryLogs(response.data);  // Store logs in the state
                setLoading(false);  // Stop loading when data is fetched
            })
            .catch(error => {
                console.error('Error fetching history logs:', error);
                setLoading(false);  // Stop loading even if there's an error
            });
    }, []);  // Empty array ensures this only runs once when the component mounts

    // Function to handle going back to the previous page
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="history-log">
            <h2>History Log</h2>
            
            {/* Back button */}
            <button className="back-button" onClick={handleBackClick}>
                Back
            </button>

            {/* Loading indicator */}
            {loading ? (
                <div className="loading-indicator">Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Action</th>
                            <th>Resource</th>
                            <th>Changes</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyLogs.map(log => (
                            <tr key={log._id}>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                                <td>{log.actionType}</td>
                                <td>{log.resourceType}</td>
                                <td>{log.resourceName}</td>
                                <td>{log.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedBackground === 'anime' && (
                <>
                <img 
                    src={animeChar1} 
                    alt="Anime Character 1" 
                    style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '10px',
                    left: '550px',
                    transform: 'scale(1)',
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
                    top: '8px',
                    left: '300px',
                    transform: 'scale(1)',
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
                    top: '8px',
                    left: '850px',
                    transform: 'scale(1)',
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
                    top: '7px',
                    left: '1075px',
                    transform: 'scale(1)',
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
                    top: '10px',
                    left: '1250px',
                    transform: 'scale(1)',
                    margin: '0',
                    zIndex: 0
                    }} 
                />
                <img 
                    src={animeChar6} 
                    alt="Anime Character 6" 
                    style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '15px',
                    left: '50px',
                    transform: 'scale(1.4)',
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
                    top: '10px',
                    left: '500px',
                    transform: 'scale(2)',
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
                    top: '15px',
                    left: '270px',
                    transform: 'scale(2)',
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
                    top: '8px',
                    left: '830px',
                    transform: 'scale(1.5)',
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
                    top: '7px',
                    left: '1040px',
                    transform: 'scale(1.5)',
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
                    top: '10px',
                    left: '1250px',
                    transform: 'scale(1.3)',
                    margin: '0',
                    zIndex: 0
                    }} 
                />
                <img 
                    src={beachChar6} 
                    alt="Beach Character 6" 
                    style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '15px',
                    left: '50px',
                    transform: 'scale(1.4)',
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
                    top: '10px',
                    left: '500px',
                    transform: 'scale(1.5)',
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
                    top: '8px',
                    left: '270px',
                    transform: 'scale(2)',
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
                    top: '8px',
                    left: '850px',
                    transform: 'scale(2)',
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
                    top: '20px',
                    left: '1070px',
                    transform: 'scale(1.5)',
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
                    top: '10px',
                    left: '1250px',
                    transform: 'scale(2)',
                    margin: '0',
                    zIndex: 0
                    }} 
                />
                <img 
                    src={forestChar6} 
                    alt="Forest Character 6" 
                    style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '15px',
                    left: '50px',
                    transform: 'scale(1.4)',
                    margin: '0',
                    zIndex: 1000
                    }} 
                />
                </>
            )}
        </div>
    );
};

export default HistoryLog;
