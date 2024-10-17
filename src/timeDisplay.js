import React, { useState, useEffect } from 'react';

const TimeDisplay = () => {
    const [dateTime, setDateTime] = useState({
        date: '',
        day: '',
        time: '',
    });

useEffect(() => {
    const updateDateTime = () => {
        const now = new Date();
        const options = { weekday: 'long' };
        const date = now.toLocaleDateString('en-GB');
        const day = new Intl.DateTimeFormat('en-US', options).format(now);
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format to hour and minute

        setDateTime({
            date,
            day,
            time,
        });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
}, []);

return (
    <div className="datetime">
        <div id="current-date">Date: {dateTime.date}</div>
        <div id="current-day">Day: {dateTime.day}</div>
        <div id="current-time">Time: {dateTime.time}</div>
    </div>
);
};

export default TimeDisplay;
