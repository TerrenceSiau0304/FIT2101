import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TimeDisplay from './timeDisplay';
import './ProductBacklogAdmin.css';
import './SprintBacklog.css';
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

const SprintBoardUser = ({selectedBackground}) => {
  const navigate = useNavigate();
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sprint');
        const fetchedSprints = response.data;
        const updatedSprints = checkAndUpdateSprintStatus(fetchedSprints);
        setSprints(updatedSprints);
      } catch (error) {
        console.error('Error fetching sprints:', error);
      }
    };

    fetchSprints();
  }, []);

  const checkAndUpdateSprintStatus = (sprints) => {
    const today = new Date();
    const todayString = today.toLocaleDateString('en-CA'); // Normalize today's date to 'YYYY-MM-DD' format

    return sprints.map(sprint => {
      const startDate = new Date(sprint.startDate);
      const startDateString = startDate.toLocaleDateString('en-CA'); // Normalize start date
      const endDate = new Date(sprint.endDate);
      const endDateString = endDate.toLocaleDateString('en-CA'); // Normalize end date

      let updatedSprint = { ...sprint };

      if (startDateString === todayString && sprint.sprintStatus === 'Not started') {
        updatedSprint.sprintStatus = 'In progress';
        updateSprintStatus(sprint._id, 'In progress');
      } 
      
      if (endDateString === todayString && sprint.sprintStatus !== 'Completed') {
        updatedSprint.sprintStatus = 'Completed';
        updateSprintStatus(sprint._id, 'Completed');
      }

      return updatedSprint;
    });
  };

  const updateSprintStatus = async (sprintId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/sprint/${sprintId}`, {
        sprintStatus: newStatus,
      });
    } catch (error) {
      console.error(`Error updating sprint ${sprintId}:`, error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSprintClick = (sprint) => {
    if (sprint.sprintStatus === "Not started") {
      navigate(`/DragAndDrop/${sprint._id}`);
    } else {
      navigate(`/KanbanBoard/${sprint._id}`);
    }
  };

  const handleLogTimeClick = (sprint) => {
    if (sprint) {
      console.log("Navigating to log time with sprint ID:", sprint._id);
      navigate(`/log-time/${sprint._id}`);
    } else {
      console.error("No sprint selected for logging time");
    }
  };

  return (
    <div className="containersprintbacklog">
      <div className="sidebar"></div>
      <TimeDisplay />
      <div className="menu">
        <div className="menu-title">Menu:</div>
        <button className="menu-item" onClick={() => navigate('/ProductBacklogUser')}>
          Product Backlog
        </button>
        <button className="menu-item" onClick={() => navigate('/SprintBoardUser')}>
          Sprint Board
        </button>
        <button className="menu-item" onClick={() => navigate('/TeamBoardLogin')}>
          Team Board
        </button>
        <button className="menu-item" onClick={() => navigate('/history')}>
          History Log
        </button>
        {/* Only show Log Time button if there's an active sprint */}
        {sprints.some(sprint => sprint.sprintStatus === 'In progress') && (
          <button className="menu-item" onClick={() => handleLogTimeClick(sprints.find(s => s.sprintStatus === 'In progress'))}>
            Daily Log Time
          </button>
        )}
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Sprint Board:</h2>
        </div>
        <div className="sprint-box-container">
          {sprints.map((sprint, index) => (
            <button className="sprint-box" onClick={() => handleSprintClick(sprint)} key={index}>
              <div>Sprint: {sprint.sprintName}</div>
              <div>Start Date: {formatDate(sprint.startDate)}</div>
              <div>End Date: {formatDate(sprint.endDate)}</div>
              <div>Status: {sprint.sprintStatus}</div>
            </button>
          ))}
        </div>
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
              top: '800px',
              left: '100px',
              transform: 'scale(3)',
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
              top: '100px',
              left: '350px',
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
              top: '80px',
              left: '1025px',
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
              top: '75px',
              left: '1175px',
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
              top: '800px',
              left: '1100px',
              transform: 'scale(4)',
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
              top: '60px',
              left: '730px',
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
              top: '800px',
              left: '100px',
              transform: 'scale(5)',
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
              top: '100px',
              left: '350px',
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
              top: '80px',
              left: '1025px',
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
              top: '75px',
              left: '1175px',
              transform: 'scale(2)',
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
              top: '800px',
              left: '1200px',
              transform: 'scale(3)',
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
              top: '60px',
              left: '730px',
              transform: 'scale(2.2)',
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
              top: '800px',
              left: '100px',
              transform: 'scale(5)',
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
              top: '100px',
              left: '350px',
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
              top: '80px',
              left: '1025px',
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
              top: '75px',
              left: '1175px',
              transform: 'scale(2)',
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
              top: '800px',
              left: '1200px',
              transform: 'scale(5)',
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
              top: '60px',
              left: '730px',
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

export default SprintBoardUser;