import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../redux/slices/taskSlice";
import "../styles/Task.css";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleDelete = () => {
    dispatch(removeTask({ id: task._id, token }));
  };

  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <div className="task-buttons">
        <button className="task-button delete-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
