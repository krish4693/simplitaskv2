// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import {RouterProvider} from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <Navbar /> */}
    <App/>
  </Provider>,
);
