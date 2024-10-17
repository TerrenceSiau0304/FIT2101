const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const verifyToken = require('../middleware/authMiddleware'); // Import the middleware

// Secret key for JWT (ensure to keep this secure and use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Route to get all admins (protected)
router.route('/').get(verifyToken, (req, res) => {
    Admin.find()
        .then(admins => res.json(admins))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new admin
router.route('/add').post(async (req, res) => {
    try {
        const { username, password, isAdmin } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json('Admin with this username already exists.');
        }

        const newAdmin = new Admin({ username, password, isAdmin });

        await newAdmin.save();
        res.json("Admin added!");
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Route for admin login
router.route('/login').post(async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json('Invalid username or password.');
        }

        // Compare passwords directly
        if (admin.password !== password) {
            return res.status(400).json('Invalid username or password.');
        }

        // Create JWT payload
        const payload = {
            id: admin._id,
            username: admin.username,
            isAdmin: admin.isAdmin
        };

        // Sign token
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json('Server error: ' + err.message);
    }
});

module.exports = router;