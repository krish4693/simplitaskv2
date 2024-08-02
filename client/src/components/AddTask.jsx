import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from "../redux/slices/taskSlice";
import { logout } from "../redux/slices/authSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(createTask({ task: { title, description }, token }));
      setTitle("");
      setDescription("");
    }
  };

  const handleSeeNotes = () => {
    navigate("/tasks");
  };

  const handleLogout=()=>{
        dispatch(logout())
        navigate('/login')
  }

  return (
    <>
      <div className="navbar">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Add Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <button onClick={handleSeeNotes}>See Notes</button>
    </>
  );
};

export default AddTask;
