// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const registerUser = createAsyncThunk('auth/registerUser', async (user, { rejectWithValue }) => {
    try {
        await register(user);
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (user, { rejectWithValue }) => {
    try {
        const { data } = await login(user);
        return data.token;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'),
    },
    reducers: {
        logout(state) {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            toast.info('Logged out successfully.');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state) => {
                toast.success('Registration successful!');
            })
            .addCase(registerUser.rejected, (state, action) => {
                toast.error(action.payload || 'Registration failed.');
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload);
                state.token = action.payload;
                state.isAuthenticated = true;
                toast.success('Login successful!');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.token = null;
                state.isAuthenticated = false;
                toast.error(action.payload || 'Login failed.');
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
