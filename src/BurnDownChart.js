import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './BurnDownChart.css';

const BurnDownChart = () => {
  const chartRef = useRef(null); // Reference to the Chart instance
  const canvasRef = useRef(null); // Reference to the canvas element
  const navigate = useNavigate();
  const [total_story_point, setStoryPoint] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const [thisSprint, setThisSprint] = useState(null);
  const { id } = useParams();

  // Fetch data on initial render or when the sprint ID changes
  useEffect(() => {
    const fetchSprintData = async () => {
      try {
        const currentSprint = await axios.get(`http://localhost:5000/sprint/${id}`);
        const sprintData = currentSprint.data;
        setThisSprint(sprintData);

        if (sprintData && sprintData.tasks.length > 0) {
          // Fetch task details for the tasks in the sprint
          const taskPromises = sprintData.tasks.map(taskId => 
            axios.get(`http://localhost:5000/task/${taskId}`)
          );
          const taskResponses = await Promise.all(taskPromises);
          const taskDetails = taskResponses.map(res => res.data);
          setAllTasks(taskDetails);

          // Calculate total story points
          const totalPoint = taskDetails.reduce((acc, task) => acc + task.story_point, 0);
          setStoryPoint(totalPoint);  // Update the state for total_story_point
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSprintData();
  }, [id]); 

  // Second useEffect for chart creation once total_story_point and allTasks are updated
  useEffect(() => {
    if (!thisSprint) return; // Early exit if thisSprint is null
    const ctx = canvasRef.current.getContext('2d');
    
    // Destroy the previous chart if it exists to prevent memory leaks
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const start = new Date(thisSprint.startDate);

    const end = new Date(thisSprint.endDate);
    const daysArray = [];
    start.setDate(start.getDate() - 1);

    // Populate daysArray with dates from start to end
    while (start <= end) {
      daysArray.push(new Date(start).toLocaleDateString()); 
      start.setDate(start.getDate() + 1);
    }

    let remainingStoryPoints = [];
    let cumulativeStoryPoint = total_story_point;

    remainingStoryPoints.push(cumulativeStoryPoint); 
    
    const secondStart = new Date(thisSprint.startDate);

    while ( secondStart.getTime() <= end.getTime() && secondStart.getDate() <= (new Date(Date.now())).getDate()) {
      let pointsToDeduct = 0;

      allTasks.forEach(function(task) {
        if (task.taskStatus === 'Completed' && secondStart.getDate() === (new Date(task.timeCompleted)).getDate()) {
          pointsToDeduct += task.story_point; // Accumulate the story points of completed tasks
        }
      });
    
      // Deduct the points and update cumulative story points
      const result = cumulativeStoryPoint - pointsToDeduct;
      cumulativeStoryPoint -= pointsToDeduct;
      remainingStoryPoints.push(result);
    
      // Move to the next day
      secondStart.setDate(secondStart.getDate() + 1);  // Increment the 'start' date by one day
    }

    const XDataPoints = (new Date(thisSprint.endDate) - new Date(thisSprint.startDate))/(1000 * 60 * 60 * 24);  
    const totalDays = XDataPoints + 1;


    const gradient = (-total_story_point/ totalDays);
    console.log(gradient);

    const perfectLine = [];
    for(let i=0 ; i <= totalDays ; i++){
      let result = (gradient * i + total_story_point);
      perfectLine.push(result);
    }
    
    // Create a new chart instance using updated state
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: daysArray, 
        datasets: [{
          label: 'Actual',
          data: remainingStoryPoints,  // Remaining story points for each day
          borderWidth: 1,
          fill: false,
          borderColor: 'rgba(139, 0, 0, 1)',
          tension: 0.1 // Optional: makes the line slightly curved
        },
        {
          label: 'Ideal', // Label for the intercept line
          data: perfectLine, // Data points for the line based on intercepts
          borderWidth: 1,
          fill: false,
          borderColor: 'rgba(0, 128, 0, 1)', 
          tension: 0.1 // Optional: makes the line slightly curved
      }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup: Destroy the chart when the component unmounts or before re-rendering
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [total_story_point, allTasks, thisSprint]); // Run this effect when total_story_point or allTasks change

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Burn Down Chart</h1>
      <div className="chart">
        <canvas id="myChart" ref={canvasRef}></canvas>
        <button
          className="return"
          onClick={(e) => {
            e.preventDefault(); // Prevent default behavior
            navigate('/sprint-backlog');
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
};
  

export default BurnDownChart;
