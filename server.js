const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6000;

app.use(cors({
    origin: 'https://terrencesiau0304.github.io' // Your frontend URL
}));
app.use(express.json());

// Conditionally setting the URI based on environment
const isDevelopment = process.env.NODE_ENV === 'development'; // or check for local flag

const uri = 'mongodb+srv://terrencesiau:tskadMJOhLuoXyJJ@cluster0.b5r6a.mongodb.net/'; 


// Connecting to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB database connection established successfully at ${uri}`);
});

const taskRouter = require('./BackEnd/routes/task');
const adminRouter = require('./BackEnd/routes/admin');
const userRouter = require('./BackEnd/routes/user');
const sprintRouter = require('./BackEnd/routes/sprint');
const historyRouter = require('./BackEnd/routes/history');
const timeLoggedRouter = require('./BackEnd/routes/time_logged');

app.use('/task', taskRouter);
app.use('/admin', adminRouter);
app.use('/sprint', sprintRouter);
app.use('/history', historyRouter);
app.use('/user', userRouter);
app.use('/time', timeLoggedRouter);

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
