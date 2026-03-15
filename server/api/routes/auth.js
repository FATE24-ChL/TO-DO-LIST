// const express = require('express');
// const jwt = require('jsonwebtoken');
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const SECRET_KEY = 'asdlfkjas;kldjfs;kjf'; // Replace with a secure key in production

// Dummy user for demonstration
const users = [
    { id: 1, username: 'testuser', password: 'testpass' }
];

// Register route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected profile route', user: req.user });
});

module.exports = router;