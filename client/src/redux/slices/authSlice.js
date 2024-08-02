// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login } from '../../api/api';
import {useNavigate} from 'react-router-dom'

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
        isAuthenticated: false,
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
                console.log("Login successfull")
                state.token = action.payload;
                state.isAuthenticated = true;
                console.log(state.isAuthenticated)
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
