// src/App.jsx
import React from 'react';
import {  RouterProvider } from 'react-router-dom';
import router from './router';
import './App.css'

const App = () => {
    return (
        <>
        
        <RouterProvider router={router}/>
        </>
    )
    
};

export default App;
