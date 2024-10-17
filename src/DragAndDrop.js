import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DragAndDrop.css';
import { useNavigate, useParams } from 'react-router-dom';
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

const DragAndDrop = ({selectedBackground}) => {
    const [tasks, setTasks] = useState([]); // Tasks available for dragging
    const [todoTasks, setTodoTasks] = useState([]); // Tasks in the sprint's to-do list
    const [currentSprint, setCurrentSprint] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Extract sprint ID from URL
  
    useEffect(() => {
      const fetchTasksAndSprints = async () => {
        try {
          // Log the sprint ID to ensure it's being captured correctly
          console.log('Sprint ID:', id);

          // Fetch all tasks
          const tasksResponse = await axios.get('http://localhost:5000/task');
          const allTasks = tasksResponse.data;
  
          // Fetch the current sprint to get its tasks
          const sprintResponse = await axios.get(`http://localhost:5000/sprint/${id}`);
          const currentSprintData = sprintResponse.data;
          console.log('Sprint Data:', currentSprintData); // Log sprint data
          setCurrentSprint(currentSprintData);
  
          // Fetch all sprints to check for tasks already assigned to other sprints
          const allSprintsResponse = await axios.get('http://localhost:5000/sprint');
          const allSprints = allSprintsResponse.data;
  
          // Get the IDs of tasks already in other sprints
          const tasksInOtherSprints = new Set();
          allSprints.forEach(sprint => {
            if (sprint._id !== id) {
              sprint.tasks.forEach(taskId => tasksInOtherSprints.add(taskId));
            }
          });
  
          // Determine which tasks are already assigned to the current sprint
          const assignedTasks = allTasks.filter(task => currentSprintData.tasks.includes(task._id));
  
          // Exclude tasks in the current sprint's to-do list from available tasks
          const availableTasks = allTasks.filter(task => 
            !tasksInOtherSprints.has(task._id) && !currentSprintData.tasks.includes(task._id)
          );

          console.log(assignedTasks);
          console.log(availableTasks);
  
          setTodoTasks(assignedTasks); // Tasks in current sprint's to-do list
          setTasks(availableTasks); // Available tasks for dragging
        } catch (error) {
          console.error('Error fetching tasks or sprints:', error);
        }
      };
  
      fetchTasksAndSprints();
    }, [id]);
  
    const handleDragStart = (e, task, sourceColumn) => {
      e.dataTransfer.setData('task', JSON.stringify(task));
      e.dataTransfer.setData('sourceColumn', sourceColumn);
    };
  
    const handleDrop = (e, destinationColumn) => {
      e.preventDefault();
      const task = JSON.parse(e.dataTransfer.getData('task'));
      const sourceColumn = e.dataTransfer.getData('sourceColumn');
  
      if (sourceColumn !== destinationColumn) {
        if (destinationColumn === 'todoTasks') {
          setTodoTasks([...todoTasks, task]);
          setTasks(tasks.filter(t => t._id !== task._id));
        } else if (destinationColumn === 'tasks') {
          setTasks([...tasks, task]);
          setTodoTasks(todoTasks.filter(t => t._id !== task._id));
        }
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleSave = async () => {
      const sprintData = {
        tasks: todoTasks.map(task => task._id),
      };
  
      try {
        const username = localStorage.getItem('username');
        const response = await axios.put(`http://localhost:5000/sprint/saveTask/${id}`, sprintData, {
          headers: {
            'Content-Type': 'application/json',
            'username': username,
          },
        });
  
        console.log('Server response:', response.data);
  
        if (response.data.sprint) {
          console.log('Sprint updated successfully:', response.data.sprint);
          alert(response.data.message || 'Sprint updated successfully!');
          setCurrentSprint(response.data.sprint);
          navigate('/sprint-backlog');
        } else {
          console.error('Error updating sprint:', response.data.message);
          alert(response.data.message || 'Failed to update the Sprint. Please try again.');
        }
      } catch (error) {
        console.error('Error updating sprint:', error.response ? error.response.data : error.message);
        alert('Failed to update the sprint. Please check the console for errors.');
      }
    };
  
    const handleForceStart = async () => {
      try {
        const sprintsResponse = await axios.get('http://localhost:5000/sprint');
        const sprints = sprintsResponse.data;
    
        const today = new Date().toLocaleDateString('en-CA');
    
        const hasOverlap = sprints.some(sprint => sprint.sprintStatus === 'In progress');
    
        if (hasOverlap) {
          alert('Cannot force start sprint. Another sprint is currently active or scheduled for today.');
          return; 
        }
    
        const username = localStorage.getItem('username');
        const response = await axios.put(`http://localhost:5000/sprint/update/${id}`, 
          { 
            ...currentSprint,
            startDate: today,
            sprintStatus: 'In progress'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'username': username,
            },
          }
        );
  
        if (response.data.message.includes('successfully')) {
          setCurrentSprint({ ...currentSprint, startDate: today, sprintStatus: 'In progress' });
          alert('Sprint force started successfully!');
          navigate('/sprint-backlog');
        } else {
          alert(response.data.message || 'Failed to force start the sprint.');
        }
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert('Failed to process the request. Please check the console for errors.');
      }
    };
  
    const handleForceEnd = async () => {
      const today = new Date().toLocaleDateString('en-CA');
      try {
        const username = localStorage.getItem('username');
        const response = await axios.put(`http://localhost:5000/sprint/update/${id}`, 
          { 
            ...currentSprint,
            endDate: today,
            sprintStatus: 'Completed'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'username': username,
            },
          }
        );
  
        if (response.data.message.includes('successfully')) {
          setCurrentSprint({...currentSprint, endDate: today, sprintStatus: 'Completed'});
          alert('Sprint force ended successfully!');
          navigate('/sprint-backlog');
        } else {
          alert(response.data.message || 'Failed to force end the sprint.');
        }
      } catch (error) {
        console.error('Error force ending sprint:', error);
        alert('Failed to force end the sprint. Please check the console for errors.');
      }
    };
  
    const handleDelete = async () => {
      const username = localStorage.getItem('username');
  
      try {
        const response = await axios.delete(`http://localhost:5000/sprint/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'username': username
          },
        });
  
        if (response.data.message.includes('successfully')) {
          alert('Sprint deleted successfully');
          navigate('/sprint-backlog');
        } else {
          alert(response.data.message || 'Failed to delete the sprint.');
        }
      } catch (error) {
        console.error('Error deleting sprint:', error);
        alert('Failed to delete the sprint. Please check the console for errors.');
      }
    };
  
    return (
      <div className="dragdrop-container">
        <h1>Drag Tasks to Sprint</h1>
        <div className="dragdrop-board">
          <div
            className="dragdrop-column not-started"
            onDrop={(e) => handleDrop(e, 'tasks')}
            onDragOver={handleDragOver}
          >
            <h3>Task</h3>
            {tasks.map((task, index) => (
              <div
                className="dragdrop-box"
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, task, 'tasks')}
              >
                <div className="dragdrop-task-name">Task Name: {task.name}</div>
                <div className="dragdrop-story-point">Story Point: {task.story_point}</div>
                <div className="dragdrop-tags-box">
                  {task.tags && task.tags.length > 0 ? (
                    task.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span>No Tags</span>
                  )}
                </div>
              </div>
            ))}
          </div>
  
          <div
            className="dragdrop-column in-progress"
            onDrop={(e) => handleDrop(e, 'todoTasks')}
            onDragOver={handleDragOver}
          >
            <h3>Sprint To-do</h3>
            {todoTasks.map((task, index) => (
              <div
                className="dragdrop-box"
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, task, 'todoTasks')}
              >
                <div className="dragdrop-task-name">Task Name: {task.name}</div>
                <div className="dragdrop-story-point">Story Point: {task.story_point}</div>
                <div className="dragdrop-tags-box">
                  {task.tags && task.tags.length > 0 ? (
                    task.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span>No Tags</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleDelete} className="delete-sprint-dragdrop">Delete</button>
        <button
          className="save-changes-dragdrop"
          id="save-changes-dragdrop"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <div className="force-buttons">
          <button onClick={handleForceStart}>Force Start</button>
          <button onClick={handleForceEnd}>Force End</button>
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
                top: '100px',
                left: '700px',
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
                top: '330px',
                left: '700px',
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
                top: '465px',
                left: '700px',
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
                top: '600px',
                left: '700px',
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
                top: '750px',
                left: '700px',
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
                top: '870px',
                left: '700px',
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
                top: '100px',
                left: '700px',
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
                top: '250px',
                left: '700px',
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
                top: '400px',
                left: '700px',
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
                top: '550px',
                left: '700px',
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
                top: '700px',
                left: '700px',
                transform: 'scale(1.7)',
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
                top: '850px',
                left: '700px',
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
                top: '100px',
                left: '700px',
                transform: 'scale(3)',
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
                top: '230px',
                left: '700px',
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
                top: '400px',
                left: '700px',
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
                top: '550px',
                left: '700px',
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
                top: '700px',
                left: '700px',
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
                top: '880px',
                left: '700px',
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

export default DragAndDrop;