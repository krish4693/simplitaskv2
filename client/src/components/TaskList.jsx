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
    <div className="task-list-container">
      <div className="navbar">
        <button className="navbar-button logout-button" onClick={handleLogout}>Logout</button>
        <button className="navbar-button add-task-button" onClick={handleAddTasks}>Add New Task</button>
      </div>
      <h2>My Notes</h2>
      <div className="list-container">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
