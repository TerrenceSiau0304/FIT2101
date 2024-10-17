const express = require('express');
const router = express.Router();
const TimeLogged = require('../models/time_logged.model'); // Ensure you have this model
const mongoose = require('mongoose'); // Import mongoose to use ObjectId
const { ObjectId } = require('mongoose').Types;

router.route('/').get((req, res) => {
  TimeLogged.find()
      .then(timeLog => res.json(timeLog))
      .catch(err => res.status(400).json('Error: ' + err));
});

// GET route to fetch time logs
router.get('/logs/:sprintId', async (req, res) => {
  try {
    const { sprintId } = req.params;

    if (!ObjectId.isValid(sprintId)) {
      return res.status(400).json({ message: 'Invalid sprint ID format.' });
    }

    // Fetch all logs for the sprint, regardless of user
    const timeLogs = await TimeLogged.find({ sprintId }).sort({ date: -1 });

    res.json(timeLogs);
  } catch (error) {
    console.error('Error fetching time logs:', error);
    res.status(500).json({ message: 'Error fetching time logs', error: error.message });
  }
});

router.route('/').get((req, res) => {
  TimeLogged.find()
      .then(time => res.json(time)) // Changed tasks to time to match the resolved variable
      .catch(err => res.status(400).json('Error: ' + err));
});

// POST route to log time
router.post('/log/:sprintId', async (req, res) => {
  const { time, username } = req.body; // Only username is required now
  const { sprintId } = req.params;

  // Validate time format
  const isValidTimeFormat = (time) => {
    return /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/.test(time);
  };

  if (!isValidTimeFormat(time)) {
    return res.status(400).json({ message: 'Invalid time format. Please use HH:MM:SS.' });
  }

  try {
    // Validate sprintId format
    if (!mongoose.Types.ObjectId.isValid(sprintId)) {
      return res.status(400).json({ message: 'Invalid sprint ID format.' });
    }

    const newTimeLogged = new TimeLogged({
      sprintId: new mongoose.Types.ObjectId(sprintId),
      time,
      username  // Only use the username
    });

    await newTimeLogged.save();
    res.status(201).json({ message: 'Time logged successfully', details: newTimeLogged });
  } catch (error) {
    console.error('Error logging time:', error);
    res.status(500).json({ message: 'Error logging time', error: error.message });
  }
});

// GET route to calculate total time logged for a sprint by the current user
router.get('/total-time/:sprintId/:username', async (req, res) => {
  try {
    const { sprintId, username } = req.params;

    if (!ObjectId.isValid(sprintId)) {
      return res.status(400).json({ message: 'Invalid sprint ID format.' });
    }

    // Aggregate total time for the current user in the given sprint
    const totalTimes = await TimeLogged.aggregate([
      { $match: { sprintId: new ObjectId(sprintId), username: username } }, // Match sprintId and username
      {
        $group: {
          _id: null,
          totalLoggedTime: {
            $sum: {
              $add: [
                { $multiply: [{ $toInt: { $substr: ["$time", 0, 2] } }, 3600] }, // Convert hours to seconds
                { $multiply: [{ $toInt: { $substr: ["$time", 3, 2] } }, 60] },   // Convert minutes to seconds
                { $toInt: { $substr: ["$time", 6, 2] } }                        // Seconds
              ]
            }
          }
        }
      }
    ]);

    if (totalTimes.length > 0) {
      res.json({ totalLoggedTime: totalTimes[0].totalLoggedTime });
    } else {
      res.json({ totalLoggedTime: 0 }); // No time logs found
    }
  } catch (error) {
    console.error('Error calculating total time:', error);
    res.status(500).json({ message: 'Error calculating total time', error: error.message });
  }
});

// GET ALL DATA
router.route('/').get((req, res) => {
  TimeLogged.find()
      .then(time => res.json(time)) // Changed tasks to time to match the resolved variable
      .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;