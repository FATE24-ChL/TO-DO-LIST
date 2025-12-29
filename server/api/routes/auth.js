import express from 'express';

const route = express.Router();

route.post('/login', (req, res) => {
    const request = req.body;
    if (!request) {
        return res.status(400).json({ error: 'No data provided' });
    }
    else {
        if (request.username === 'pravin' && request.password === 'pravinshinde') {
            return res.json({ message: 'login successful' });
        }
        else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    }
})

route.get('/create-user', (req, res) => {
    res.send('user created');
})

export default route;