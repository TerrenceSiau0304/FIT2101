const router = require('express').Router();
const Sprint = require('../models/sprint.model');
const History = require('../models/history.model');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

// Helper function to log history
const logHistory = (userId, actionType, resourceType, resourceId, resourceName) => {
    const newHistory = new History({
        userId: userId,
        actionType: actionType,
        resourceType: resourceType,
        resourceId: resourceId,
        resourceName: resourceName
    });
    
    return newHistory.save();
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

// GET all sprints
router.route('/').get((req, res) => {
    Sprint.find()
        .then(sprints => res.json(sprints))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST to add a new sprint
router.route('/add').post((req, res) => {
    const { sprintName, startDate, endDate, sprintStatus, tasks } = req.body;
    const username = req.headers['username'];

    const newSprint = new Sprint({
        sprintName,
        startDate,
        endDate,
        sprintStatus,
        tasks
    });

    newSprint.save()
        .then(sprint => {
            findUserOrAdmin(username)
                .then(user => {
                    logHistory(user._id, 'CREATE', 'Sprint', sprint._id, sprint.sprintName)
                        .then(() => {
                            res.json({ message: 'Sprint created successfully', sprint: sprint });
                        })
                        .catch(err => {
                            console.error('Error logging history:', err);
                            // Still send a success response, but with a warning
                            res.json({ message: 'Sprint created successfully, but error logging history', sprint: sprint });
                        });
                })
                .catch(err => {
                    console.error('Error finding user:', err);
                    // Still send a success response, but with a warning
                    res.json({ message: 'Sprint created successfully, but error finding user', sprint: sprint });
                });
        })
        .catch(err => {
            console.error('Error saving sprint:', err);
            res.status(400).json({ message: 'Error saving sprint', error: err.message });
        });
});

// GET sprint by ID
router.route('/:id').get((req, res) => {
    Sprint.findById(req.params.id)
        .then(sprint => {
            if (!sprint) {
                return res.status(404).json('Sprint not found');
            }
            res.json(sprint);
        })
        .catch(err => res.status(400).json('Error fetching sprint: ' + err.message));
});


// DELETE sprint by ID
router.route('/:id').delete(async (req, res) => {
    const username = req.headers['username'];
    console.log('Username received for delete:', username);

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const deletedSprint = await Sprint.findByIdAndDelete(req.params.id);
        if (!deletedSprint) {
            return res.status(404).json({ message: 'Sprint not found' });
        }

        const user = await findUserOrAdmin(username);
        if (!user) {
            return res.status(200).json({ message: 'Sprint deleted but user not found' });
        }

        await logHistory(user._id, 'DELETE', 'Sprint', deletedSprint._id, deletedSprint.sprintName);
        res.status(200).json({ message: 'Sprint deleted successfully' });
    } catch (err) {
        console.error('Error deleting sprint:', err);
        res.status(500).json({ message: 'Error: ' + err.message });
    }
});



// PUT to update a sprint by ID
router.route('/update/:id').put((req, res) => {
    const { sprintStatus, endDate } = req.body;
    const username = req.headers['username'];

    if (!sprintStatus || !endDate || !username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    Sprint.findById(req.params.id)
        .then(sprint => {
            if (!sprint) {
                console.log('Sprint not found:', req.params.id);
                return res.status(404).json({ error: 'Sprint not found' });
            }
            
            // Update sprint fields
            sprint.sprintStatus = sprintStatus;
            sprint.endDate = endDate;

            sprint.save()
                .then(() => res.json({ message: 'Sprint updated successfully' }))
                .catch(err => {
                    console.error('Error saving sprint:', err);
                    res.status(500).json({ error: 'Error saving sprint', details: err.message });
                });
        })
        .catch(err => {
            console.error('Error finding sprint:', err);
            res.status(500).json({ error: 'Error finding sprint', details: err.message });
        });
});

router.route('/saveTask/:id').put((req, res) => {
    const username = req.headers['username'];

    Sprint.findById(req.params.id)
        .then(sprint => {
            if (!sprint) return res.status(404).json({ message: 'Sprint not found' });

            sprint.tasks = req.body.tasks;

            sprint.save()
                .then(updatedSprint => {
                    findUserOrAdmin(username)
                        .then(user => {
                            logHistory(user._id, 'UPDATED_TASKS', 'Sprint', updatedSprint._id, updatedSprint.sprintName)
                                .then(() => {
                                    res.json({ message: 'Sprint updated successfully', sprint: updatedSprint });
                                })
                                .catch(err => {
                                    console.error('Error logging history:', err);
                                    res.json({ message: 'Sprint updated successfully, but error logging history', sprint: updatedSprint });
                                });
                        })
                        .catch(err => {
                            console.error('Error finding user:', err);
                            res.json({ message: 'Sprint updated successfully, but error finding user', sprint: updatedSprint });
                        });
                })
                .catch(error => {
                    console.error('Error saving sprint:', error);
                    res.status(500).json({
                        message: 'Error saving sprint',
                        error: error.message
                    });
                });
        })
        .catch(error => {
            console.error('Error finding sprint:', error);
            res.status(500).json({
                message: 'Error finding sprint',
                error: error.message
            });
        });
});

module.exports = router;
