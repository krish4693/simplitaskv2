// src/components/TaskList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../redux/slices/taskSlice';
import Task from './Task';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        dispatch(getTasks(token));
    }, [dispatch, token]);

    return (
        <div>
            <h2>Task List</h2>
            {tasks.map(task => (
                <Task key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
