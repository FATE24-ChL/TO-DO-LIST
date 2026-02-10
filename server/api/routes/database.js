import express from 'express';
import mongoose, { mongo, Schema } from 'mongoose';

const route = express.Router();
const tasks = ['task1', 'task2', 'task3'];

const databaseUrl = "mongodb://127.0.0.1:27017/todoapp"
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const shema = new mongoose.Schema({
    task: String
});

route.get('/get-tasks', (req, res) => {
    shema.find({}, (err, tasks) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching tasks' });
        }
        else {
            return res.json({ tasks });
        }
    })
});
route.post('/add-task', (req, res) => {
    const task = req.body.task;
    if (!task) {
        return res.status(400).json({ error: 'No task provided' });
    }
    else {
        shema.create({ task: task });
        tasks.push(task);
        console.log(tasks);
        return res.json({ message: 'Task added successfully', tasks });
    }
});
route.delete('/delete-task', (req, res) => {
    const task = req.body.task;


    if (!task) {
        return res.status(400).json({ error: 'No task provided' });
    }
    else {
        shema.deleteOne({ task: task }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting task' });
            }
            else {
                tasks.pop(task);
                console.log(tasks);
                return res.json({ message: 'Task deleted successfully', tasks });
            }
        });
    }
});

export default route;