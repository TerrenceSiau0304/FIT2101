const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
    'https://terrencesiau0304.github.io', // Production frontend
    'http://localhost:3000' // Local development frontend
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// MongoDB Connection
const uri = "mongodb+srv://Terrencesiau:Terrence%400304@cluster0.b5r6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri)
    .then(() => console.log(`MongoDB database connection established successfully`))
    .catch(err => console.error('MongoDB connection error:', err.message));

// Routers
const taskRouter = require('./BackEnd/routes/task');
const adminRouter = require('./BackEnd/routes/admin');
const userRouter = require('./BackEnd/routes/user');
const sprintRouter = require('./BackEnd/routes/sprint');
const historyRouter = require('./BackEnd/routes/history');
const timeLoggedRouter = require('./BackEnd/routes/time_logged');

// Routes
app.use('/task', taskRouter);
app.use('/admin', adminRouter);
app.use('/sprint', sprintRouter);
app.use('/history', historyRouter);
app.use('/user', userRouter);
app.use('/time', timeLoggedRouter);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
