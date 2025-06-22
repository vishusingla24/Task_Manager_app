import React, { useState } from "react";

const UpdateTaskModal = ({ task, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleChange = (e) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(updatedTask);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Task</h2>
        <input
          type="text"
          name="taskName"
          value={updatedTask.taskName}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <textarea
          name="description"
          value={updatedTask.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <select name="priority" value={updatedTask.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="average">Average</option>
          <option value="top">Top Priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={updatedTask.deadline}
          onChange={handleChange}
        />
        <select name="done" value={updatedTask.done} onChange={handleChange}>
          <option value="false">Not Completed</option>
          <option value="true">Completed</option>
        </select>
        <button onClick={handleUpdate}>Update Task</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
