import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './LogTime.css'; // Import the CSS file
import animeChar1 from './characters/anime_char_1.jpg';
import animeChar2 from './characters/anime_char_2.png';
import animeChar3 from './characters/anime_char_3.png';
import animeChar4 from './characters/anime_char_4.png';
import animeChar5 from './characters/anime_char_5.png';
import animeChar6 from './characters/anime_char_6.png';


function LogTime({ theme, selectedBackground }) {
  const { sprintId } = useParams();
  const navigate = useNavigate(); // Initialize navigate hook
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [logs, setLogs] = useState([]);
  const [totalTime, setTotalTime] = useState('');
  const username = localStorage.getItem('username'); // Retrieve username from localStorage

  // Fetch logs and total time on component mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/time/logs/${sprintId}`);
        setLogs(response.data);

        const totalResponse = await axios.get(`http://localhost:5000/time/total-time/${sprintId}/${username}`);
        setTotalTime(totalResponse.data.totalLoggedTime);
      } catch (error) {
        console.error('Error fetching logs:', error.response ? error.response.data : error.message);
        setError('Failed to fetch time logs.');
      }
    };

    fetchLogs();
  }, [sprintId, username]);

  // Convert HH:MM:SS string into total seconds
  const parseTimeToSeconds = (timeString) => {
    if (typeof timeString !== 'string') {
      console.error('Invalid timeString:', timeString);
      return 0; // Return 0 seconds if the time is invalid
    }

    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Convert total seconds back to HH:MM:SS format
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((unit) => String(unit).padStart(2, '0')).join(':');
  };

  // Handle the time input change
  const handleTimeChange = (e) => {
    let inputValue = e.target.value;
    const numbers = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters

    if (numbers.length <= 2) {
      setTime(numbers);
    } else if (numbers.length <= 4) {
      setTime(`${numbers.slice(0, 2)}:${numbers.slice(2)}`);
    } else if (numbers.length <= 6) {
      setTime(`${numbers.slice(0, 2)}:${numbers.slice(2, 4)}:${numbers.slice(4)}`);
    }
  };

  // Validate time input (HH:MM:SS format)
  const isValidTimeFormat = (time) => {
    return /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/.test(time);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isValidTimeFormat(time)) {
      setError('Please enter a valid time in HH:MM:SS format.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/time/log/${sprintId}`, 
        { time, username },  // Pass the username in the request body
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setTime(''); // Clear input after submission
      setError('');

      const fetchLogs = async () => {
        const response = await axios.get(`http://localhost:5000/time/logs/${sprintId}`);
        setLogs(response.data);

        const totalResponse = await axios.get(`http://localhost:5000/time/total-time/${sprintId}/${username}`);
        setTotalTime(totalResponse.data.totalLoggedTime);
      };

      fetchLogs();
    } catch (error) {
      console.error('Error logging time:', error.response ? error.response.data : error.message);
      setError('Failed to log time. Please try again.');
    }
  };

  // Back button handler
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className={`log-time-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <h1>Log Time for Sprint</h1>

      {/* Total Logged Time just below the header */}
      <h2 className="total-logged-time">Total Logged Time of {username}: {formatTime(totalTime)}</h2>

      <input
        type="text"
        value={time}
        onChange={handleTimeChange}
        placeholder="Enter time as HH:MM:SS"
        className="time-input"  // Apply CSS class for input box
      />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      {error && <p className="error-message">{error}</p>}
      
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Username</th>
            <th>Time Logged</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{new Date(log.date).toLocaleDateString()}</td>
              <td>{log.username}</td>
              <td>{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleBackClick} className="back-button">Back</button>

      {selectedBackground === 'anime' && (
                <>
                    <img 
                    src={animeChar1} 
                    alt="Anime Character 1" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '220px',
                        left: '450px',
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
                        top: '460px',
                        left: '450px',
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
                        top: '50px',
                        left: '450px',
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
                        top: '50px',
                        left: '1000px',
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
                        top: '250px',
                        left: '1000px',
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
                        top: '480px',
                        left: '1000px',
                        transform: 'scale(2.5)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                />
            </>
            )}
    </div>
  );
}

export default LogTime;
