// src/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask } from '../../api/api';

export const getTasks = createAsyncThunk('tasks/getTasks', async (token) => {
    const { data } = await fetchTasks(token);
    return data;
});

export const createTask = createAsyncThunk('tasks/createTask', async ({ task, token }) => {
    const { data } = await addTask(task, token);
    return data;
});

export const removeTask = createAsyncThunk('tasks/removeTask', async ({ id, token }) => {
    await deleteTask(id, token);
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            });
    }
});

export default taskSlice.reducer;
