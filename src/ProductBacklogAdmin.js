import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import TimeDisplay from './timeDisplay';
import './ProductBacklogAdmin.css';
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

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        Sorting
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductBacklogAdmin = ({selectedBackground}) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState('priority,ascending');
  const [order, setOrder] = useState('ascending');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5000/task/')
      .then((response) => {
        let sortedTasks = response.data;
        if (sortOption.startsWith('priority')) {
          sortedTasks = sortTasksByPriority(sortedTasks, order === 'ascending');
        } else if (sortOption.startsWith('date')) {
          sortedTasks = sortTasksByDate(sortedTasks, order === 'oldest');
        }
        setTasks(sortedTasks);
        setFilteredTasks(sortedTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [order, sortOption]);

  const sortTasksByPriority = (tasks, ascending) => {
    const priorityOrder = { Urgent: 1, High: 2, Medium: 3, Low: 4 };
    return tasks.sort((a, b) => {
      const priorityA = priorityOrder[a.priority] || 5;
      const priorityB = priorityOrder[b.priority] || 5;
      return ascending ? priorityA - priorityB : priorityB - priorityA;
    });
  };

  const sortTasksByDate = (tasks, oldest) => {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return oldest ? dateA - dateB : dateB - dateA;
    });
  };

  useEffect(() => {
    let updatedTasks = tasks;
    const priorityFilters = selectedFilters
      .filter((filter) => filter.type === 'priority')
      .map((filter) => filter.value);
    const tagFilters = selectedFilters
      .filter((filter) => filter.type === 'tag')
      .map((filter) => filter.value);

    if (priorityFilters.length > 0) {
      updatedTasks = updatedTasks.filter((task) =>
        priorityFilters.includes(task.priority)
      );
    }

    if (tagFilters.length > 0) {
      updatedTasks = updatedTasks.filter((task) =>
        task.tag && task.tag.split(',').some((tag) => tagFilters.includes(tag.trim()))
      );
    }

    setFilteredTasks(updatedTasks);
  }, [selectedFilters, tasks]);

  const handleSortChange = (value) => {
    const [option, order] = value.split(',');
    setSortOption(option);
    setOrder(order);
  };

  const filterOptions = [
    { value: 'Low', label: 'Low Priority', type: 'priority' },
    { value: 'Medium', label: 'Medium Priority', type: 'priority' },
    { value: 'High', label: 'High Priority', type: 'priority' },
    { value: 'Urgent', label: 'Urgent Priority', type: 'priority' },
    { value: 'frontend', label: 'Frontend Tag', type: 'tag' },
    { value: 'backend', label: 'Backend Tag', type: 'tag' },
    { value: 'api', label: 'API Tag', type: 'tag' },
    { value: 'database', label: 'Database Tag', type: 'tag' },
    { value: 'ui', label: 'UI Tag', type: 'tag' },
  ];

  const sortOptions = [
    { label: 'Sort by Priority (Urgent to Low)', value: 'priority,ascending' },
    { label: 'Sort by Priority (Low to Urgent)', value: 'priority,descending' },
    { label: 'Sort by Date (Oldest)', value: 'date,oldest' },
    { label: 'Sort by Date (Latest)', value: 'date,latest' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: '200px',
      zIndex: 100,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 200,
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '12px',
      color: 'black',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: '12px',
      color: 'black',
    }),
  };

  return (
    <div className="containerproductbacklog">
      <div className="sidebar"></div>

      <TimeDisplay />

      <div className="menu">
        <div className="menu-title">Menu:</div>
        <button 
          className="menu-item"
          id="Product-Backlog"
          onClick={() => navigate('/')}
        >
          Product Backlog
        </button>
        <button 
          className="menu-item" 
          id="Sprint-Board"
          onClick={() => navigate('/sprint-backlog')}
        >
          Sprint Board
        </button>
        <button className="menu-item" id="Team-board" onClick={() => navigate('/TeamBoardLogin')}>
          Team Board
        </button>
        <button className="menu-item" id="History-Log" onClick={() => navigate('/history')}>
          History Log
        </button>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Product Backlog:</h2>
          <button
            className="create-task"
            id="Create-task"
            onClick={() => navigate('/create-task')}
          >
            Create Task
          </button>

          {/* Sorting and Filter Components Stacked */}
          <div className="sorting-filter-container">
            <CustomDropdown options={sortOptions} onSelect={handleSortChange} />
            <div className="filters" style={{ zIndex: 100 }}>
              <Select
                options={filterOptions}
                onChange={setSelectedFilters}
                value={selectedFilters}
                isMulti
                placeholder="Filter by Priority or Tags"
                classNamePrefix="select"
                isClearable
                styles={customStyles}
                menuPlacement="auto"
                menuPosition="fixed"
                closeMenuOnSelect={false}
                blurInputOnSelect={false}
              />
            </div>
          </div>
        </div>
        <div className="task-grid">
          {filteredTasks.map((task, index) => (
            <button
              key={index}
              className="task-box"
              onClick={() => navigate(`/edit-task/${task._id}`)}
            >
              <div className="task-name">Task Name: {task.name}</div>
              <div className="story-point">Story Point: {task.story_point}</div>
              <div className="priority-tag">
                <div className={`priority-tag-item ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </div>
              </div>
              <div className="tags-box">
                {task.tags && task.tags.length > 0 ? (
                  task.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span></span>
                )}
              </div>
              <div className="date">
                Date: {new Date(task.date).toLocaleDateString()}
              </div>
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
                top: '720px',
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
                top: '600px',
                left: '675px',
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
                top: '365px',
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
                top: '720px',
                left: '150px',
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
                top: '600px',
                left: '675px',
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
                top: '365px',
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
                top: '800px',
                left: '1150px',
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
                top: '40px',
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
                top: '720px',
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
                top: '600px',
                left: '675px',
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
                top: '365px',
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
                top: '800px',
                left: '1100px',
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
                top: '60px',
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

export default ProductBacklogAdmin;