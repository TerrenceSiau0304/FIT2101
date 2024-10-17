const router = require('express').Router();
const Task = require('../models/task.model');
const History = require('../models/history.model');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

// Helper function to log history
const logHistory = (userId, actionType, resourceType, resourceId, resourceName, res) => {
    const newHistory = new History({
        userId: userId,  // Either from user or admin
        actionType: actionType,
        resourceType: resourceType,
        resourceId: resourceId,
        resourceName: resourceName
    });
    
    newHistory.save()
        .then(() => res.json(`${actionType} action logged!`))
        .catch(err => res.status(400).json('Error logging action: ' + err));
};

// Function to find a user or admin by username
const findUserOrAdmin = (username) => {
    return new Promise((resolve, reject) => {
        // First, check the User model
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    resolve(user);
                } else {
                    // If no user found, check the Admin model
                    Admin.findOne({ username: username })
                        .then(admin => {
                            if (admin) {
                                resolve(admin);
                            } else {
                                reject('User or Admin not found');
                            }
                        })
                        .catch(err => reject('Error finding admin: ' + err));
                }
            })
            .catch(err => reject('Error finding user: ' + err));
    });
};

// GET all tasks
router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET unassigned tasks
router.route('/unassigned').get((req, res) => {
    Task.find({ sprint: null })  // Find tasks where sprint is null
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST to add a new task
router.route('/add').post((req, res) => {
    const name = req.body.name;
    const story_point = req.body.story_point;
    const assignee = req.body.assignee;
    const priority = req.body.priority;
    const taskStatus = req.body.taskStatus;
    const timeCompleted = req.body.timeCompleted || null;
    const type = req.body.type;
    const description = req.body.description;
    const date = req.body.date ? Date.parse(req.body.date) : Date.now();
    const sprint = req.body.sprint || null;
    const tags = req.body.tags || [];
    const projectStage = req.body.projectStage;
    const username = req.headers['username'];

    const newTask = new Task({
        name,
        story_point,
        assignee,
        priority,
        taskStatus,
        timeCompleted,
        type,
        description,
        date,
        sprint,
        tags,
        projectStage
    });

    newTask.save()
        .then(task => {
            // Find the user or admin by username
            findUserOrAdmin(username)
                .then(user => {
                    // Log history after task is created
                    logHistory(user._id, 'CREATE', 'Task', task._id, task.name, res);
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json('Error saving task: ' + err.message));
});

// GET task by ID
router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE task by ID
router.route('/:id').delete((req, res) => {
    const username = req.headers['username'];  // Extract username from headers
    console.log('Username received for delete:', username);

    if (!username) {
        return res.status(400).json('Username is required');
    }

    Task.findByIdAndDelete(req.params.id)
        .then(deletedTask => {
            if (!deletedTask) return res.status(404).json('Task not found');

            // Find the user or admin by username
            findUserOrAdmin(username)
                .then(user => {
                    // Log history after task is deleted
                    logHistory(user._id, 'DELETE', 'Task', deletedTask._id, deletedTask.name, res);
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT to update a task by ID
router.route('/update/:id').put((req, res) => {
    const username = req.headers['username'];

    Task.findById(req.params.id)
        .then(task => {
            if (!task) return res.status(404).json('Task not found');
            // Update task fields
            task.name = req.body.name;
            task.story_point = req.body.story_point;
            task.assignee = req.body.assignee;
            task.priority = req.body.priority;
            task.taskStatus = req.body.taskStatus;
            task.timeCompleted = req.body.timeCompleted ? new Date(req.body.timeCompleted) : task.timeCompleted;
            task.type = req.body.type;
            task.description = req.body.description;
            task.date = req.body.date ? Date.parse(req.body.date) : task.date;
            task.sprint = req.body.sprint || task.sprint;
            task.tags = req.body.tags || task.tags;
            task.projectStage = req.body.projectStage || task.projectStage;

            task.save()
                .then(updatedTask => {
                    // Find the user or admin by username
                    findUserOrAdmin(username)
                        .then(user => {
                            // Log history after task is updated
                            logHistory(user._id, 'UPDATE', 'Task', updatedTask._id, updatedTask.name, res);
                        })
                        .catch(err => res.status(400).json(err));
                })
                .catch(err => res.status(400).json('Error updating task: ' + err));
        })
        .catch(err => res.status(400).json('Error finding task: ' + err));
});

module.exports = router;