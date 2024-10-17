const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json('Access Denied: No Token Provided!');
    }

    const token = authHeader.split(' ')[1]; // Expecting format "Bearer <token>"

    if (!token) {
        return res.status(401).json('Access Denied: No Token Provided!');
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(400).json('Invalid Token');
    }
};

module.exports = verifyToken;