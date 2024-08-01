// src/components/Task.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask } from '../redux/slices/taskSlice';

const Task = ({ task }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);

    const handleDelete = () => {
        dispatch(removeTask({ id: task._id, token }));
    };

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Task;
