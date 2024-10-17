import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TeamChart = () => {
    const location = useLocation();
    const { userData } = location.state || {};

    useEffect(() => {
        console.log("Location state:", location.state);
        console.log("userData:", userData);
    }, [location.state, userData]);

    const getFilteredLogs = (logs) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Move one day back to get yesterday
    
        // Create an empty object to hold the grouped data by date
        const groupedLogs = {};
    
        // Initialize each day within the last 7 days (excluding today) with 0 hours
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(yesterday); // Start from yesterday
            currentDate.setDate(yesterday.getDate() - i); // Go back from yesterday
            const dateString = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD' format
            groupedLogs[dateString] = 0;
        }
    
        // Accumulate hours for each date in the past 7 days
        logs.forEach(log => {
            const logDate = new Date(log.date).toISOString().split('T')[0]; // Get 'YYYY-MM-DD' format
            if (groupedLogs[logDate] !== undefined) {
                groupedLogs[logDate] += log.hours; // Add hours to the correct day
            }
        });
    
        // Convert the grouped data into an array of dates and total hours and reverse the array
        return Object.entries(groupedLogs)
            .map(([date, hours]) => ({ date, hours }))
            .reverse(); // Reverse to start from 7 days ago
    };

    const filteredLogs = userData && Array.isArray(userData.logs) 
        ? getFilteredLogs(userData.logs) 
        : [];

    console.log("Filtered logs:", filteredLogs);

    const data = {
        labels: filteredLogs.map(log => log.date),
        datasets: [
            {
                label: 'Hours Logged',
                data: filteredLogs.map(log => log.hours),
                backgroundColor: 'rgba(217, 69, 69, 0.7)',
                borderColor: 'rgba(255, 99, 92, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    if (!userData) {
        return (
            <div className="team-chart">
                <h1>Team Member Chart</h1>
                <p>No data available. Please go back and select a team member.</p>
            </div>
        );
    }

    return (
        <div className="team-chart">
            <h1>Team Member Chart</h1>
            <h2>{userData.name}'s Working Hours</h2>
            {filteredLogs.length > 0 ? (
                <Bar data={data} options={options} />
            ) : (
                <p>No data available for the selected date range.</p>
            )}
        </div>
    );
};

export default TeamChart;
