const router = require('express').Router();
const History = require('../models/history.model');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

router.route('/').get(async (req, res) => {
    try {
        let histories = await History.find().sort({ timestamp: -1 });

        // Iterate through each history log and populate the username dynamically
        histories = await Promise.all(histories.map(async log => {
            let user = await User.findById(log.userId).select('username');
            if (!user) {
                user = await Admin.findById(log.userId).select('username'); // Check in Admin if not found in User
            }
            log = log.toObject(); // Convert Mongoose document to plain JavaScript object
            log.username = user ? user.username : 'Unknown User';  // Add username or fallback to 'Unknown User'
            return log;
        }));

        res.json(histories);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
