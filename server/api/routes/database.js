import express from 'express';

const route = express.Router();
const tasks = ['task1', 'task2', 'task3'];


route.get('/get-tasks', (req, res) => {
    res.json({ tasks });
})

route.post('/add-task', (req, res) => {
    const task = req.body.task;
    if (!task) {
        return res.status(400).json({ error: 'No task provided' });
    }
    else {
        tasks.push(task);
        console.log(tasks);
        return res.json({ message: 'Task added successfully', tasks });
    }
});

export default route;