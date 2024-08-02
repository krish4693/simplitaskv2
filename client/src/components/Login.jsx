// src/components/Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import {Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <nav>
            <Link to='/register'>Register</Link>
            <Link to='/tasks'>Tasks</Link>

        </nav>
            <h2>Login</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
