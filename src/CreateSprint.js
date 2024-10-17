import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import './CreateSprint.css';
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

const CreateSprint = ({selectedBackground}) => {
    const navigate = useNavigate()
    const [sprintName, setSprintName] = useState('');
    const [sprintStatus, setSprintStatus] = useState('Not started');
    const [startDate, setSprintStartDate] = useState('');
    const [endDate, setSprintEndDate] = useState('');
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const username = localStorage.getItem('username');

    const closePopup = () => {
    setShowPopup(false);
    };

    const handleCreateSprint = async () => {
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            setError('End date cannot be earlier than start date.');
            setShowPopup(true);
            return;
        }
    
        try {
            const response = await axios.get('http://localhost:5000/sprint', {
                headers: {
                    'Content-Type': 'application/json',
                    'username': username,
                },
            });
    
            const existingSprints = response.data;
    
            // Check if the new sprint overlaps with any existing sprints
            const hasOverlap = existingSprints.some(sprint => {
                const existingStartDate = new Date(sprint.startDate);
                const existingEndDate = new Date(sprint.endDate);
                const newStartDate = new Date(startDate);
                const newEndDate = new Date(endDate);
    
                return (
                    (newStartDate >= existingStartDate && newStartDate <= existingEndDate) ||
                    (newEndDate >= existingStartDate && newEndDate <= existingEndDate) ||
                    (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
                );
            });
    
            if (hasOverlap) {
                setError('The new sprint overlaps with an existing sprint.');
                setShowPopup(true);
                return;
            }
    
            // Automatically set sprint status based on start date
            const today = new Date().toISOString().split('T')[0];
            const initialStatus = startDate === today ? 'In progress' : sprintStatus;
    
            
            const sprintData = {
                sprintName,
                startDate,
                endDate,
                sprintStatus: initialStatus,
                username,
            };
    
            const saveResponse = await axios.post('http://localhost:5000/sprint/add', sprintData, {
                headers: {
                    'Content-Type': 'application/json',
                    'username': username,
                },
            });
    
            if (saveResponse.data.sprint) {
                console.log('Sprint saved successfully:', saveResponse.data.sprint);
                alert(saveResponse.data.message); // This will show any warnings if there were issues logging history
                navigate('/sprint-backlog');
            } else {
                console.error('Error saving sprint:', saveResponse.data.message);
                alert('Failed to save the Sprint. Please check the console for errors.');
            }
    
        } catch (error) {
            console.error('Error checking or saving sprint:', error);
            alert('Failed to save the Sprint. Please check the console for errors.');
        }
    };


return (
    <div className="create-sprint-wrapper">
        <div className="create-sprint-container">
        <h2>Create Sprint</h2>
            <div className="create-sprint-grid">
            
            <div className="sprint-field-container">
                <label>Sprint Name:</label>
                <input
                type="text"
                value={sprintName}
                onChange={(e) => setSprintName(e.target.value)}
                />
            </div>

            
            <div className="sprint-field-container">
                <label>Status:</label>
                <select value={sprintStatus} onChange={(e) => setSprintStatus(e.target.value)}>
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
                </select>
            </div>

            
            <div className="sprint-field-container">
                <label>Sprint Start Date:</label>
                <input
                type="date"
                value={startDate}
                onChange={(e) => setSprintStartDate(e.target.value)}
                />
            </div>

            
            <div className="sprint-field-container">
                <label>Sprint End Date:</label>
                <input
                type="date"
                value={endDate}
                onChange={(e) => setSprintEndDate(e.target.value)}
                />
            </div>
            </div>

            <button type="submit" className="create-sprint-button" onClick={handleCreateSprint}>Create Sprint</button>

            {showPopup && (
                <div className="popup-overlay">
                <div className="popup-content">
                    <p>{error}</p>
                    <button onClick={closePopup}>Close</button>
                </div>
                </div>
            )}
            
        </div>

      {selectedBackground === 'anime' && (
        <>
          <img 
            src={animeChar1} 
            alt="Anime Character 1" 
            style={{
              position: 'absolute',
              width: '50px',
              height: 'auto',
              top: '550px',
              left: '250px',
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
              top: '200px',
              left: '250px',
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
              top: '200px',
              left: '1170px',
              transform: 'scale(2)',
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
              top: '630px',
              left: '710px',
              transform: 'scale(2)',
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
              top: '590px',
              left: '1100px',
              transform: 'scale(2.5)',
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
              top: '170px',
              left: '710px',
              transform: 'scale(2.2)',
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
              top: '570px',
              left: '250px',
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
              left: '250px',
              transform: 'scale(4)',
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
              top: '200px',
              left: '1100px',
              transform: 'scale(3)',
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
              top: '630px',
              left: '680px',
              transform: 'scale(3)',
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
              top: '620px',
              left: '1120px',
              transform: 'scale(2.5)',
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
              top: '160px',
              left: '680px',
              transform: 'scale(3)',
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
              top: '550px',
              left: '250px',
              transform: 'scale(4)',
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
              top: '200px',
              left: '300px',
              transform: 'scale(4)',
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
              top: '240px',
              left: '1100px',
              transform: 'scale(3)',
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
              top: '630px',
              left: '710px',
              transform: 'scale(3)',
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
              top: '590px',
              left: '1120px',
              transform: 'scale(4)',
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
              top: '170px',
              left: '710px',
              transform: 'scale(2.2)',
              margin: '0',
              zIndex: 1000
            }} 
          />
        </>
      )}
    </div>
    );
};

export default CreateSprint;