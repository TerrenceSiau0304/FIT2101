import React, { useEffect, useRef, useState } from 'react';
import './MemberAverageWorkingHours.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

const MemberAverageWorkingHours = ({ selectedBackground }) => {
    const navigate = useNavigate();
    const member = localStorage.getItem('username');
    const [allTime, setAllTime] = useState(null);
    const [average, setAverage] = useState(null);
    const [last7DaysData, setLast7DaysData] = useState([]);
    const canvasRef = useRef(null);
    const location = useLocation();
    const { startDate, endDate } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/time/');
                setAllTime(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (allTime) {
            const end = new Date(); // Today's date
            const start = new Date();
            start.setDate(end.getDate() - 7); // Get date 7 days ago

            const workingHours = {}; // To store total working hours for the past 7 days (excluding today)

            // Loop through each time log
            allTime.forEach(timeLog => {
                const logDate = new Date(timeLog.date);
                if (timeLog.username === member && logDate >= start && logDate < end) { // Exclude today
                    // Convert time string (HH:mm:ss) to seconds
                    const [hours, minutes, seconds] = timeLog.time.split(':').map(Number);
                    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

                    // Format the date as YYYY-MM-DD
                    const dateKey = logDate.toISOString().split('T')[0];

                    // Accumulate total working hours for each date
                    if (!workingHours[dateKey]) {
                        workingHours[dateKey] = 0;
                    }
                    workingHours[dateKey] += totalSeconds;
                }
            });

            // Create data for the last 7 days excluding today
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const dateKey = new Date(end);
                dateKey.setDate(dateKey.getDate() - (i + 1)); // Start from yesterday
                const formattedDate = dateKey.toISOString().split('T')[0];
                last7Days.push({
                    date: formattedDate,
                    hours: (workingHours[formattedDate] ? workingHours[formattedDate] / 3600 : 0) // Convert to hours
                });
            }
            setLast7DaysData(last7Days);
        }
    }, [allTime, member]);

    useEffect(() => {
        if (last7DaysData.length > 0 && canvasRef.current) {
            const chart = new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels: last7DaysData.map(data => data.date), // Dates for x-axis
                    datasets: [{
                        label: 'Working Hours',
                        data: last7DaysData.map(data => data.hours), // Hours for y-axis
                        backgroundColor: 'rgba(75, 192, 75, 0.6)', // Green color for the bars
                        borderColor: 'rgba(75, 192, 75, 1)', // Darker green border
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Hours'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            },
                            ticks: {
                                autoSkip: false,  // Ensure all labels are shown
                            }
                        }
                    },
                    plugins: {
                        // Custom plugin for chart background
                        beforeDraw: (chart) => {
                            const ctx = chart.ctx;
                            const chartArea = chart.chartArea;
                            ctx.save();
                            ctx.fillStyle = selectedBackground || 'rgba(240, 240, 240, 0.5)'; // Customize the background color
                            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                            ctx.restore();
                        }
                    }
                }
            });

            return () => {
                chart.destroy(); // Clean up the chart instance
            };
        }
    }, [last7DaysData, selectedBackground]);

    useEffect(() => {
        if (allTime && startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
            let totalTimeInSeconds = 0;

            // Loop through each date in the range
            while (start <= end) {
                allTime.forEach(timeLog => {
                    const logDate = new Date(timeLog.date);

                    // Check if the log belongs to the member and matches the date
                    if (timeLog.username === member &&
                        logDate.getFullYear() === start.getFullYear() &&
                        logDate.getMonth() === start.getMonth() &&
                        logDate.getDate() === start.getDate()) {

                        // Convert time string (HH:mm:ss) to seconds
                        const [hours, minutes, seconds] = timeLog.time.split(':').map(Number);
                        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
                        totalTimeInSeconds += totalSeconds;
                    }
                });
                start.setDate(start.getDate() + 1);
            }

            // Calculate average in hours
            const averageHours = totalDays > 0 ? (totalTimeInSeconds / totalDays) / 3600 : 0;
            setAverage(averageHours);
        }
    }, [allTime, startDate, endDate, member]);

    const handleReturn = () => {
        navigate('/MemberDashBoard');
    };

    return (
        <div className="user-board">
            <h1>Dashboard</h1>

            {/* User Information */}
            <div className="user-box-container">
                <label htmlFor="user-name-box" className="user-name-label">Member Name</label>
                <div id="user-name-box" className="user-info-box">
                    <p>{member || 'Unknown Member'}</p>
                </div>
            </div>

            <div className="user-box-container">
                <label htmlFor="user-time-box" className="user-time-label">Average Working Hours(/Days)</label>
                <div id="user-time-box" className="user-info-box">
                    <p>{average !== null ? average.toFixed(2) : 'Loading...'}</p>
                </div>
            </div>

            {/* Chart Container */}
            <div className="chart-container">
                <canvas ref={canvasRef} />
            </div>

            <user-button onClick={handleReturn}>Return</user-button>
        </div>
    );
};

export default MemberAverageWorkingHours;
