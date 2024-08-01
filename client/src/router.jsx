// src/router.js
import { createBrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
    {
        path: "/",
        element: <TaskList />,
        errorElement: <NotFound />
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <NotFound />
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <NotFound />
    },
    {
        path: "/add-task",
        element: <AddTask />,
        errorElement: <NotFound />
    },
    {
        path: "/tasks",
        element: <TaskList />,
        errorElement: <NotFound />
    }
]);

export default router;
