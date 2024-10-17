import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './TeamAverageWorkingHours.css';

const TeamAverageWorkingHours = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [aggregatedLogs, setAggregatedLogs] = useState([]);
    const location = useLocation(); 
    const { startDate, endDate } = location.state || {};
    const timeLogs = location.state?.timeLogs || []; 
    const navigate = useNavigate();

    useEffect(() => {
        const aggregateLogs = () => {
            const userMap = {};

            timeLogs.forEach(log => {
                if (!userMap[log.username]) {
                    userMap[log.username] = { hours: 0, logs: [] };
                }
                const [hours, minutes, seconds] = log.time.split(':').map(Number);
                const totalHours = hours + minutes / 60 + seconds / 3600;
                userMap[log.username].hours += totalHours;
                userMap[log.username].logs.push({ date: log.date, hours: totalHours });
            });
            
            const start = new Date(startDate);
            const end = new Date(endDate);
            const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;

            const result = Object.entries(userMap).map(([username, { hours, logs }]) => ({
                name: username,
                averageHours: (hours / dayCount).toFixed(2),
                logs
            }));

            setAggregatedLogs(result);
        };

        aggregateLogs();
    }, [timeLogs, startDate, endDate]);

    const handleShowGraph = (userIndex) => {
        const selectedUserData = aggregatedLogs[userIndex];
        console.log("Selected user data:", selectedUserData);
        navigate('/team-chart', { 
            state: { 
                userData: selectedUserData,
                startDate,
                endDate
            } 
        });
    };

    // Group logs by date for the past 7 days
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
            .reverse(); // Reverse to start from 7 days ago
    };

    const filteredLogs = selectedUser !== null ? getFilteredLogs(aggregatedLogs[selectedUser]?.logs) : [];

    const data = {
        labels: filteredLogs.map(log => log.date), // Use the past 7 days as labels
        datasets: [
            {
                label: 'Hours Logged',
                data: filteredLogs.map(log => log.hours), // Use accumulated hours for each day
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

    return (
        <div className="team-board">
            <h1>Team Board</h1>
            <h2>Team Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Name</th>
                        <th>Average Work Hour Per Day Over the Period of Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {aggregatedLogs.map((member, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{member.name}</td>
                            <td>{member.averageHours}</td>
                            <td><button onClick={() => handleShowGraph(index)}>Show Graph</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUser !== null && (
                <Bar data={data} options={options} />
            )}
        </div>
    );
};

export default TeamAverageWorkingHours;
