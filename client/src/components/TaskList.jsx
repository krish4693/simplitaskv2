import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../redux/slices/taskSlice";
import Task from "./Task";
import "../styles/TaskList.css";
import { logout } from "../redux/slices/authSlice";


const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log(isAuthenticated);
      navigate("/login");
    } else {
      dispatch(getTasks(token));
    }
  }, [dispatch, token, isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddTasks = () => {
    navigate("/add-task");
  };

  return (
    <div>
      <div className="navbar">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleAddTasks}>Add New Task</button>
      </div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
