// server/routes/tasks.js
import express from 'express';
import Task from '../models/Task.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        req.userId = decoded.id;
        next();
    });
};

// Get Tasks
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add Task
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ userId: req.userId, title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete Task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!task) return res.status(404).send('Task not found');
        res.json(task);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
