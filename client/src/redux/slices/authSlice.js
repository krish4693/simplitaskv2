// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../../api/api';

export const registerUser = createAsyncThunk('auth/registerUser', async (user) => {
    await register(user);
});

export const loginUser = createAsyncThunk('auth/loginUser', async (user) => {
    const { data } = await login(user);
    return data.token;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
    },
    reducers: {
        logout(state) {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state) => {
                // Handle registration success if needed
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload);
                state.token = action.payload;
                state.isAuthenticated = true;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
