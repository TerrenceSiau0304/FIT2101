const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware
const Task = require('../models/task.model');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const userEmail= req.body.userEmail
    const password = req.body.password;
    const isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : false; // Default to true if not provided

    const newUser = new User({ username, userEmail, password, isAdmin });

    newUser.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get by username
router.route('/:username').get((req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete user with task reassignment
router.route('/:username').delete(async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json('Team Member does not exist.');
        }

        // Check if the user has any ongoing tasks assigned
        const tasks = await Task.find({ assignee: req.params.username });

        if (tasks.length > 0) {
            // If tasks are found, return the list of tasks and users
            const otherUsers = await User.find({ username: { $ne: req.params.username } }, 'username');
            return res.status(200).json({
                message: 'Team member has ongoing tasks. Please reassign them.',
                tasks: tasks,
                users: otherUsers
            });
        }

        // If no tasks are assigned, proceed to delete the user
        const deletedUser = await User.findOneAndDelete({ username: req.params.username });

        if (deletedUser) {
            res.json('User deleted.');
        } else {
            res.status(404).json('Team Member does not exist.');
        }
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Reassign tasks to another user and delete the old user
router.route('/reassign-tasks-and-delete').post(async (req, res) => {
    const { taskIds, newAssignee, oldUsername } = req.body;

    // Log the incoming data
    console.log("Task IDs: ", taskIds);
    console.log("New Assignee: ", newAssignee);
    console.log("Old Username: ", oldUsername);

    try {
        // Ensure taskIds, newAssignee, and oldUsername are provided
        if (!taskIds || !newAssignee || !oldUsername) {
            return res.status(400).json('Missing taskIds, newAssignee, or oldUsername');
        }

        // Step 1: Reassign each task to the new assignee
        for (let taskId of taskIds) {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json(`Task with ID ${taskId} not found.`);
            }
            task.assignee = newAssignee; // Update the assignee field
            await task.save(); // Save the updated task
        }

        // Step 2: After reassignment, delete the user
        const deletedUser = await User.findOneAndDelete({ username: oldUsername });

        if (deletedUser) {
            return res.json('Tasks reassigned and user deleted successfully.');
        } else {
            return res.status(404).json('Failed to delete the user after reassignment.');
        }
    } catch (error) {
        return res.status(400).json('Error reassigning tasks or deleting user: ' + error);
    }
});

//update the user
router.route('/update/:username').put((req, res) => { // Changed from post to put
    console.log('Updating Username:', req.params.username);  // Log task ID
    console.log('Received Data:', req.body);  // Log the task data  
    User.findOne({ username: req.params.username })
        .then(user => {
            if (!user) {
                return res.status(404).json('User not found.');
            }
            user.username = req.body.username || user.username;
            user.userEmail = req.body.userEmail || user.userEmail;
            user.password = req.body.password || user.password;
            user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route for admin login
router.route('/login').post(async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json('Invalid username or password.');
        }

        // Compare passwords directly
        if (user.password !== password) {
            return res.status(400).json('Invalid username or password.');
        }

        // Create JWT payload
        const payload = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        };

        // Sign token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json('Server error: ' + err.message);
    }
});

module.exports = router;