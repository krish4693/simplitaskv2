// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/add-task">Add Task</Link>
                <Link to="/tasks">Tasks</Link>
            </nav>
            <Routes>
                <Route path="/register" element={Register} />
                <Route path="/login" element={Login} />
                <Route path="/add-task" element={AddTask} />
                <Route path="/tasks" element={TaskList} />
            </Routes>
        </Router>
    );
};

export default App;
