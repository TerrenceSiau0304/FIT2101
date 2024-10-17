import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './KanbanBoard.css';
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

const KanbanBoard = ({selectedBackground}) => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [updatedTasks, setUpdatedTasks] = useState([]); // Temporary state for tracking task updates
  const [sprintStatus, setSprintStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Sprint ID:", id);  // Verify the sprint ID is being passed
    axios.get(`http://localhost:5000/sprint/${id}`)
      .then((response) => {
        console.log('Sprint data received:', response.data);  // Log the sprint data
        const sprintData = response.data;
  
        if (sprintData && sprintData.tasks.length > 0) {
          // Fetch task details for the tasks in the sprint
          const taskPromises = sprintData.tasks.map(taskId => 
            axios.get(`http://localhost:5000/task/${taskId}`)
          );
  
          Promise.all(taskPromises)
            .then((taskResponses) => {
              const taskDetails = taskResponses.map(res => res.data);
              setTasks(taskDetails); // Set the full task details in state
              setUpdatedTasks(taskDetails); // Initialize updatedTasks with full task details
              setSprintStatus(sprintData.sprintStatus); // Set the sprint status
            })
            .catch((error) => {
              console.error('Error fetching task details:', error);
            });
        } else {
          setTasks([]); // Handle case where there are no tasks in the sprint
          setUpdatedTasks([]); // Handle case where there are no tasks
        }
      })
      .catch((error) => {
        console.error('Error fetching sprint:', error);
      });
  }, [id]);

  // Filter tasks based on their status
  const notStartedTasks = updatedTasks.filter((task) => task.taskStatus === 'Pending');
  const inProgressTasks = updatedTasks.filter((task) => task.taskStatus === 'In-progress');
  const completedTasks = updatedTasks.filter((task) => task.taskStatus === 'Completed');

  // Function to handle drag start
  const handleDragStart = (event, task) => {
    if (sprintStatus === 'Completed') {
      event.preventDefault(); // Prevent dragging if sprint is completed
    } else {
      event.dataTransfer.setData('taskId', task._id);
    }
  };

  // Function to handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle drop
  const handleDrop = (event, status) => {
    const taskId = event.dataTransfer.getData('taskId');
    const updatedTasksCopy = updatedTasks.map((task) => {
      if (task._id === taskId) {
        return { ...task, taskStatus: status, timeCompleted: new Date().toISOString(), }; // Update task status in temporary state
      }
      return task;
    });
    setUpdatedTasks(updatedTasksCopy);
  };

  const handleSaveChanges = async () => {
    const username = localStorage.getItem('username');

    const updateTasks = updatedTasks.map((task) => {
      const taskData = {
        ...task,
        username,
      };

      return axios.put(`http://localhost:5000/task/update/${task._id}`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          'username': username,
        },
      });
    });

    try {
      await Promise.all(updateTasks);
      console.log(updateTasks)
      console.log("All tasks updated successfully!");
      alert('All tasks updated successfully!');
      navigate('/sprint-backlog')
    } catch (error) {
      console.error("Error updating tasks:", error);
      alert('Failed to update tasks. Please check the console for errors.');
    }
  };

  const handleDelete = async () => {
    const username = localStorage.getItem('username');

    try{
      await axios.delete(`http://localhost:5000/sprint/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'username': username  // Pass the username in headers
        },
      });
        alert('Sprint deleted successfully');
        navigate('/sprint-backlog');
    } catch (error){
       console.error('Error deleting task:', error);
       alert('Failed to delete the task. Please check the console for errors.');
    }
  };


  const handleForceEnd = async () => {
    try {
      console.log('Fetching current sprint data...'); // Debug log
      const sprintResponse = await axios.get(`http://localhost:5000/sprint/${id}`);
      const sprintData = sprintResponse.data;

      console.log('Updating sprint...'); // Debug log
      // Update the sprint status to 'Completed'
      const sprintUpdate = await axios.put(`http://localhost:5000/sprint/update/${id}`, 
        { 
          sprintName: sprintData.sprintName, // Ensure sprintName is included
          startDate: sprintData.startDate, // Ensure startDate is correctly passed
          endDate: new Date().toISOString().split('T')[0], // Set end date to today
          sprintStatus: 'Completed'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'username': localStorage.getItem('username'),
          },
        }
      );
      console.log('Sprint update response:', sprintUpdate.data); // Debug log

      // Move all tasks to completed
      const updatedTasks = tasks.map(task => ({
        ...task, 
        taskStatus: 'Completed',
        timeCompleted: new Date().toISOString(),
        name: task.name,
        required: task.required,
        assignee: task.assignee,
        priority: task.priority,
        type: task.type,
        description: task.description
      }));

      console.log('Updating tasks...'); // Debug log
      // Update all tasks
      const taskUpdates = updatedTasks.map(task => 
        axios.put(`http://localhost:5000/task/update/${task._id}`, 
          task,
          {
            headers: {
              'Content-Type': 'application/json',
              'username': localStorage.getItem('username'),
            },
          }
        )
      );

      const taskUpdateResults = await Promise.all(taskUpdates);
      console.log('Task update results:', taskUpdateResults); // Debug log

      // Update local state
      setTasks(updatedTasks);
      alert('Sprint force ended successfully!');
      navigate('/sprint-backlog')
    } catch (error) {
      console.error('Error force ending sprint:', error.response ? error.response.data : error.message);
      alert('Failed to force end the sprint. Please check the console for errors.');
    }
  };

  const handleCancel = () => {
    navigate('/sprint-backlog')
  }

  return (
    <div className="kanban-container">
      <h1>Kanban Board for Sprint</h1>
      <div className="kanban-board">
        {/* Not Started Column */}
        <div
          className="kanban-column not-started"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'Pending')}
        >
          <h3>Status: Not Started</h3>
          {notStartedTasks.map((task) => (
            <div
              key={task._id}
              className="kanban-box"
              draggable={sprintStatus !== 'Completed'} // Conditionally set draggable
              onDragStart={(event) => handleDragStart(event, task)}
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

        {/* In Progress Column */}
        <div
          className="kanban-column in-progress"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'In-progress')}
        >
          <h3>Status: In Progress</h3>
          {inProgressTasks.map((task) => (
            <div
              key={task._id}
              className="kanban-box"
              draggable={sprintStatus !== 'Completed'} // Conditionally set draggable
              onDragStart={(event) => handleDragStart(event, task)}
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

        {/* Completed Column */}
        <div
          className="kanban-column completed"
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, 'Completed')}
        >
          <h3>Status: Completed</h3>
          {completedTasks.map((task) => (
            <div
              key={task._id}
              className="kanban-box"
              draggable={sprintStatus !== 'Completed'} // Conditionally set draggable
              onDragStart={(event) => handleDragStart(event, task)}
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

      <button onClick={handleForceEnd} className="force-end-kanban">Force End Sprint</button>
      <button onClick={handleCancel} className="cancel-kanban">Cancel</button>
      <button onClick={handleSaveChanges} className="save-changes-kanban">Save Changes</button>
      <button onClick={handleDelete} className="delete-sprint-kanban">Delete</button>

      {selectedBackground === 'anime' && (
          <>
            <img 
              src={animeChar1} 
              alt="Anime Character 1" 
              style={{
                position: 'absolute',
                width: '50px',
                height: 'auto',
                top: '600px',
                left: '470px',
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
                top: '100px',
                left: '470px',
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
                top: '350px',
                left: '470px',
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
                top: '350px',
                left: '960px',
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
                top: '600px',
                left: '950px',
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
                top: '100px',
                left: '955px',
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
                top: '600px',
                left: '460px',
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
                top: '100px',
                left: '460px',
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
                top: '350px',
                left: '460px',
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
                top: '350px',
                left: '940px',
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
                top: '600px',
                left: '940px',
                transform: 'scale(1.5)',
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
                top: '100px',
                left: '940px',
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
                top: '600px',
                left: '450px',
                transform: 'scale(2)',
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
                left: '450px',
                transform: 'scale(2.5)',
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
                top: '350px',
                left: '450px',
                transform: 'scale(1.8)',
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
                top: '350px',
                left: '940px',
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
                top: '600px',
                left: '940px',
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
                top: '100px',
                left: '940px',
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

export default KanbanBoard;