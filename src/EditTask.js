import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import './EditTask.css';
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

function EditTask({selectedBackground}) {
  const [taskName, setTaskName] = useState('');
  const [storyPoint, setStoryPoint] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Low');
  const [tags, setTags] = useState([]);
  const [projectStage, setProjectStage] = useState('Planning');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [type, setType] = useState('Task');
  const [description, setDescription] = useState('');
  const username = localStorage.getItem('username');

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch task data when the component mounts
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/task/${id}`);

        if (!response.data) {
          throw new Error('Task data is null or undefined');
        }

        const task = response.data;

        setTaskName(task.name || '');
        setStoryPoint(task.story_point || '');
        setAssignee(task.assignee || '');
        setPriority(task.priority || 'Low');
        setTags(
          task.tags
            ? task.tags.map(tag => ({ value: tag, label: tag }))
            : []
        ); // Correctly map tags to match Select options
        setProjectStage(task.projectStage || 'Planning');
        setTaskStatus(task.taskStatus || 'Pending');
        setType(task.type || 'Task');
        setDescription(task.description || '');
      } catch (error) {
        console.error('Error fetching task data:', error);
        alert('Failed to fetch task data. Please check if the task exists.');
      }
    };

    fetchTaskData();
  }, [id]);

  const handleSave = async () => {
    const taskData = {
      name: taskName,
      story_point: storyPoint,
      assignee,
      priority,
      tags: tags.map(tag => tag.value), // Map selected options to their values
      projectStage,
      taskStatus,
      type,
      description,
      username: username,
    };

    try {
      const username = localStorage.getItem('username');
      const response = await axios.put(`http://localhost:5000/task/update/${id}`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          'username': username,
        },
      });

      console.log('Task updated successfully:', response.data);
      alert('Task updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update the task. Please check the console for errors.');
    }
  };

  const handleTagsChange = (selectedOptions) => {
    setTags(selectedOptions);
  };

  const handleCancel = () => {
    navigate('/');
  };

  // Options for the tags select input
  const tagOptions = [
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'API', label: 'API' },
    { value: 'Database', label: 'Database' },
    { value: 'UI', label: 'UI' },
  ];

  const handleDelete = async () => {
    const username = localStorage.getItem('username');  // Get the username from localStorage

    try {
        await axios.delete(`http://localhost:5000/task/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'username': username  // Pass the username in headers
            },
        });
        alert('Task deleted successfully');
        navigate('/');
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete the task. Please check the console for errors.');
    }
};

  return (
    <div>
      <div className="header">
        <h1>Edit Task</h1>
      </div>
      <div className="container">
        <div className="form-container">
          <div className="form-group">
            <label>Task Name:</label>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Story Point:</label>
            <input type="text" value={storyPoint} onChange={(e) => setStoryPoint(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Assignee:</label>
            <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tags:</label>
            <Select
              isMulti
              options={tagOptions}
              value={tags}
              onChange={handleTagsChange}
              classNamePrefix="select"
            />
          </div>
          <div className="form-group">
            <label>Project Stage:</label>
            <select value={projectStage} onChange={(e) => setProjectStage(e.target.value)}>
              <option value="Planning">Planning</option>
              <option value="Development">Development</option>
              <option value="Testing">Testing</option>
              <option value="Integration">Integration</option>
            </select>
          </div>
          <div className="form-group">
            <label>Task Status:</label>
            <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In-progress">In-progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Bug">Bug</option>
              <option value="Task">Task</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="button-container">
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            <button className="save-button" onClick={handleSave}>Save Changes</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
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
                top: '700px',
                left: '200px',
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
                top: '80px',
                left: '1200px',
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
                left: '1150px',
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
                left: '190px',
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
                top: '735px',
                left: '1150px',
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
                top: '100px',
                left: '220px',
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
                top: '700px',
                left: '200px',
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
                top: '80px',
                left: '1200px',
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
                top: '600px',
                left: '1150px',
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
                left: '190px',
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
                top: '735px',
                left: '1220px',
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
                top: '100px',
                left: '220px',
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
                top: '700px',
                left: '200px',
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
                top: '80px',
                left: '1200px',
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
                top: '600px',
                left: '1150px',
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
                top: '350px',
                left: '190px',
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
                top: '750px',
                left: '1230px',
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
                top: '100px',
                left: '220px',
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

export default EditTask;