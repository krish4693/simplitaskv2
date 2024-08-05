// src/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask } from '../../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
                toast.success('Notes fetched successfully!');
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                toast.error(`Failed to fetch notes: ${action.error.message}`);
            })
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks.push(action.payload);
                toast.success('Note created successfully!');
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                toast.error(`Failed to create note: ${action.error.message}`);
            })
            .addCase(removeTask.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
                toast.success('Note deleted successfully!');
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                toast.error(`Failed to delete note: ${action.error.message}`);
            });
    }
});

export default taskSlice.reducer;
