// src/components/AddTask.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../redux/slices/taskSlice';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTask({ task: { title, description }, token }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;
