/*import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/task.css";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";

const Task = ({ toast, tasks, setTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    priority: "",
    deadline: "",
  });

  axios.defaults.withCredentials = true;
  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${process.env.REACT_APP_API_URL}/task/getTask`)
      .then((res) => {
        let temp = res.data.filter((obj) => obj.done);
        setTasks(res.data);
        setCompletedTasks(temp);
      })
      .catch((err) => console.log(err));
  }, [setTasks]);

  function handleOnchange(e) {
    e.preventDefault();
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  const addTask = () => {
    if (task.taskName.trim() === "" || task.deadline === "") {
      toast.error("Please enter task and deadline");
      return;
    }
    const selectedDate = new Date(task.deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Please select a valid date");
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      task,
      done: false,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/task/postTask`, newTask)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks([...tasks, newTask]);
    toast.success("Added Successfully");
    setTask({ taskName: "", priority: "top", deadline: "" });
  };

  const addToComplete = (id) => {
    const updatedTasks = tasks.map((eachTask) =>
      eachTask.id === id ? { ...eachTask, done: true } : eachTask
    );
    setTasks(updatedTasks);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/task/updateTask/${id}`, {
        done: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const completed = tasks.find((eachTask) => eachTask.id === id);
    if (completed) setCompletedTasks([...completedTasks, completed]);
  };

  const removeTask = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/task/deleteTask/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks(tasks.filter((eachTask) => id !== eachTask.id));
    setCompletedTasks(completedTasks.filter((eachTask) => id !== eachTask.id));
  };

  const upcomingTasks = tasks.filter((eachTask) => !eachTask.done);

  const comingFilteredItems = useMemo(() => {
    return upcomingTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [upcomingTasks, searchQuery]);

  const comingCompletedItems = useMemo(() => {
    return completedTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, completedTasks]);

  return (
    <div className="home-body-conatiner" data-aos="zoom-in">
      <header className="search-bar">
        <h1>Task's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </header>
      <div className="add-div">
        <input
          type="text"
          placeholder="Enter task"
          name="taskName"
          value={task.taskName || ""}
          onChange={(e) => handleOnchange(e)}
        />
        <select
          name="priority"
          placeholder="Select Priority"
          value={task.priority}
          onChange={(e) => handleOnchange(e)}
        >
          <option value="top">Top priority</option>
          <option value="average">Average priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={(e) => handleOnchange(e)}
        />
        <button id="add-bt" onClick={addTask}>
          Add
        </button>
      </div>
      <main className="task-body" data-aos="zoom-out">
        <h3>current tasks</h3>
        <div className="cur-task-list" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>Prioriy</th>
                <th>deadline</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {comingFilteredItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    {!eachTask.done && (
                      <button
                        id="done-bt"
                        onClick={() => addToComplete(eachTask.id)}
                      >
                        done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Completed tasks</h3>
        <div className="completed-task" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>priority</th>
                <th>deadline</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {comingCompletedItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    <button
                      id="task-remove"
                      onClick={() => removeTask(eachTask.id)}
                    >
                      <AiFillDelete size={20} color="#FF6969" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Task;
*/
/*
import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/task.css";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";

// Define the API base URL
const API_BASE_URL = "http://localhost:8080/api";

const Task = ({ toast, tasks, setTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    priority: "top",
    deadline: "",
    description: "",
  });
  const [taskToUpdate, setTaskToUpdate] = useState(null); // Track task being updated

  axios.defaults.withCredentials = true;

  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${API_BASE_URL}/task/getTask`)
      .then((res) => {
        let temp = res.data.filter((obj) => obj.done);
        setTasks(res.data);
        setCompletedTasks(temp);
      })
      .catch((err) => console.log(err));
  }, [setTasks]);

  function handleOnchange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  const addTask = () => {
    if (task.taskName.trim() === "" || task.deadline === "") {
      toast.error("Please enter task, deadline, and description");
      return;
    }
    const selectedDate = new Date(task.deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Please select a valid date");
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      task,
      done: false,
    };
    axios
      .post(`${API_BASE_URL}/task/postTask`, newTask)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks([...tasks, newTask]);
    toast.success("Added Successfully");
    setTask({ taskName: "", priority: "top", deadline: "", description: "" });
  };

  const addToComplete = (id) => {
    const updatedTasks = tasks.map((eachTask) =>
      eachTask.id === id ? { ...eachTask, done: true } : eachTask
    );
    setTasks(updatedTasks);
    axios
      .patch(`${API_BASE_URL}/task/updateTask/${id}`, {
        done: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const completed = tasks.find((eachTask) => eachTask.id === id);
    if (completed) setCompletedTasks([...completedTasks, completed]);
  };

  const removeTask = (id) => {
    axios
      .delete(`${API_BASE_URL}/task/deleteTask/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks(tasks.filter((eachTask) => id !== eachTask.id));
    setCompletedTasks(completedTasks.filter((eachTask) => id !== eachTask.id));
  };

  const updateTask = (id) => {
    const task = tasks.find((eachTask) => eachTask.id === id);
    if (task) {
      setTaskToUpdate(task); // Set the task to update
    }
  };

  const handleUpdateSubmit = () => {
    if (!taskToUpdate) return;

    const updatedTask = {
      taskName: taskToUpdate.task.taskName,
      description: taskToUpdate.task.description,
      priority: taskToUpdate.task.priority,
      deadline: taskToUpdate.task.deadline,
      done: taskToUpdate.done,
    };

    console.log("Sending PATCH request to:", `${API_BASE_URL}/task/updateTask/${taskToUpdate.id}`); // Debugging
    console.log("Updated task data:", updatedTask); // Debugging

    axios
      .patch(`${API_BASE_URL}/task/updateTask/${taskToUpdate.id}`, updatedTask)
      .then((res) => {
        console.log("Update response:", res.data); // Debugging
        const updatedTasks = tasks.map((eachTask) =>
          eachTask.id === taskToUpdate.id ? { ...eachTask, task: updatedTask } : eachTask
        );
        setTasks(updatedTasks);
        toast.success("Task updated successfully");
        setTaskToUpdate(null); // Close the update form
      })
      .catch((err) => {
        console.error("Update error:", err); // Debugging
        toast.error("Failed to update task");
      });
  };

  const upcomingTasks = tasks.filter((eachTask) => !eachTask.done);

  const comingFilteredItems = useMemo(() => {
    return upcomingTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [upcomingTasks, searchQuery]);

  return (
    <div className="home-body-container" data-aos="zoom-in">
      <header className="search-bar">
        <h1>Task's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </header>
      <div className="add-div">
        <input
          type="text"
          placeholder="Enter task"
          name="taskName"
          value={task.taskName || ""}
          onChange={handleOnchange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={task.description || ""}
          onChange={handleOnchange}
        />
        <select
          name="priority"
          placeholder="Select Priority"
          value={task.priority}
          onChange={handleOnchange}
        >
          <option value="top">Top priority</option>
          <option value="average">Average priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleOnchange}
        />
        <button id="add-bt" onClick={addTask}>
          Add
        </button>
      </div>
      <main className="task-body" data-aos="zoom-out">
        <h3>Current Tasks</h3>
        <div className="cur-task-list" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comingFilteredItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    {!eachTask.done && (
                      <>
                        <button id="done-bt" onClick={() => addToComplete(eachTask.id)}>
                          Done
                        </button>
                        <button id="update-bt" onClick={() => updateTask(eachTask.id)}>
                          Update
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Completed Tasks</h3>
        <div className="completed-task" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    <button id="task-remove" onClick={() => removeTask(eachTask.id)}>
                      <AiFillDelete size={20} color="#FF6969" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

    
      {taskToUpdate && (
        <div className="update-modal">
          <h3>Update Task</h3>
          <div className="modal-content">
            <div className="modal-field">
              <label>Title</label>
              <input
                type="text"
                value={taskToUpdate.task.taskName}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, taskName: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Description</label>
              <textarea
                value={taskToUpdate.task.description}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Priority</label>
              <select
                value={taskToUpdate.task.priority}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, priority: e.target.value },
                  })
                }
              >
                <option value="top">Top priority</option>
                <option value="average">Average priority</option>
                <option value="low">Low priority</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Due Date</label>
              <input
                type="date"
                value={taskToUpdate.task.deadline}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, deadline: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={handleUpdateSubmit}>Save Changes</button>
            <button onClick={() => setTaskToUpdate(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
*/
/*
import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/task.css";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";

// Define the API base URL
const API_BASE_URL = "http://localhost:8080/api";

const Task = ({ toast, tasks, setTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    priority: "top",
    deadline: "",
    description: "",
  });
  const [taskToUpdate, setTaskToUpdate] = useState(null); // Track task being updated

  axios.defaults.withCredentials = true;

  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${API_BASE_URL}/task/getTask`)
      .then((res) => {
        let temp = res.data.filter((obj) => obj.done);
        setTasks(res.data);
        setCompletedTasks(temp);
      })
      .catch((err) => console.log(err));
  }, [setTasks]);

  function handleOnchange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  const addTask = () => {
    if (task.taskName.trim() === "" || task.deadline === "") {
      toast.error("Please enter task, deadline, and description");
      return;
    }
    const selectedDate = new Date(task.deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Please select a valid date");
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      task,
      done: false,
    };
    axios
      .post(`${API_BASE_URL}/task/postTask`, newTask)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks([...tasks, newTask]);
    toast.success("Added Successfully");

    // Reset the form fields
    setTask({
      taskName: "",
      priority: "top",
      deadline: "",
      description: "",
    });
  };

  const addToComplete = (id) => {
    const updatedTasks = tasks.map((eachTask) =>
      eachTask.id === id ? { ...eachTask, done: true } : eachTask
    );
    setTasks(updatedTasks);
    axios
      .patch(`${API_BASE_URL}/task/updateTask/${id}`, {
        done: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const completed = tasks.find((eachTask) => eachTask.id === id);
    if (completed) setCompletedTasks([...completedTasks, completed]);
  };

  const removeTask = (id) => {
    axios
      .delete(`${API_BASE_URL}/task/deleteTask/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks(tasks.filter((eachTask) => id !== eachTask.id));
    setCompletedTasks(completedTasks.filter((eachTask) => id !== eachTask.id));
  };

  const updateTask = (id) => {
    const task = tasks.find((eachTask) => eachTask.id === id);
    if (task) {
      setTaskToUpdate(task); // Set the task to update
    }
  };

  const handleUpdateSubmit = () => {
    if (!taskToUpdate) return;

    const updatedTask = {
      taskName: taskToUpdate.task.taskName,
      description: taskToUpdate.task.description,
      priority: taskToUpdate.task.priority,
      deadline: taskToUpdate.task.deadline,
      done: taskToUpdate.done,
    };

    axios
      .patch(`${API_BASE_URL}/task/updateTask/${taskToUpdate.id}`, updatedTask)
      .then((res) => {
        const updatedTasks = tasks.map((eachTask) =>
          eachTask.id === taskToUpdate.id ? { ...eachTask, task: updatedTask } : eachTask
        );
        setTasks(updatedTasks);
        toast.success("Task updated successfully");
        setTaskToUpdate(null); // Close the update form
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update task");
      });
  };

  const upcomingTasks = tasks.filter((eachTask) => !eachTask.done);

  const comingFilteredItems = useMemo(() => {
    return upcomingTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [upcomingTasks, searchQuery]);

  return (
    <div className="home-body-container" data-aos="zoom-in">
      <header className="search-bar">
        <h1>Task's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </header>
      <div className="add-div">
        <input
          type="text"
          placeholder="Enter task"
          name="taskName"
          value={task.taskName || ""}
          onChange={handleOnchange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={task.description || ""}
          onChange={handleOnchange}
        />
        <select
          name="priority"
          placeholder="Select Priority"
          value={task.priority}
          onChange={handleOnchange}
        >
          <option value="top">Top priority</option>
          <option value="average">Average priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleOnchange}
        />
        <button id="add-bt" onClick={addTask}>
          Add
        </button>
      </div>
      <main className="task-body" data-aos="zoom-out">
        <h3>Current Tasks</h3>
        <div className="cur-task-list" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {comingFilteredItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    {!eachTask.done && (
                      <button id="done-bt" onClick={() => addToComplete(eachTask.id)}>
                        Done
                      </button>
                    )}
                  </td>
                  <td>
                    {!eachTask.done && (
                      <button id="update-bt" onClick={() => updateTask(eachTask.id)}>
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Completed Tasks</h3>
        <div className="completed-task" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    <button id="task-remove" onClick={() => removeTask(eachTask.id)}>
                      <AiFillDelete size={20} color="#FF6969" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Update Task Modal *//*}
      {taskToUpdate && (
        <div className="update-modal">
          <h3>Update Task</h3>
          <div className="modal-content">
            <div className="modal-field">
              <label>Title</label>
              <input
                type="text"
                value={taskToUpdate.task.taskName}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, taskName: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Description</label>
              <textarea
                value={taskToUpdate.task.description}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Priority</label>
              <select
                value={taskToUpdate.task.priority}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, priority: e.target.value },
                  })
                }
              >
                <option value="top">Top priority</option>
                <option value="average">Average priority</option>
                <option value="low">Low priority</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Due Date</label>
              <input
                type="date"
                value={taskToUpdate.task.deadline}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, deadline: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={handleUpdateSubmit}>Save Changes</button>
            <button onClick={() => setTaskToUpdate(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
*/
/*
import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/task.css";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";

// Define the API base URL
const API_BASE_URL = "http://localhost:8080/api";

const Task = ({ toast, tasks, setTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    priority: "top",
    deadline: "",
    description: "",
  });
  const [taskToUpdate, setTaskToUpdate] = useState(null); // Track task being updated
  const [activities, setActivities] = useState([]); // Activities list
  const [newActivity, setNewActivity] = useState({
    type: "",
    content: "",
  }); // New activity input
  const [viewActivitiesModal, setViewActivitiesModal] = useState(false); // Activities modal visibility

  axios.defaults.withCredentials = true;

  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${API_BASE_URL}/task/getTask`)
      .then((res) => {
        let temp = res.data.filter((obj) => obj.done);
        setTasks(res.data);
        setCompletedTasks(temp);
      })
      .catch((err) => console.log(err));
  }, [setTasks]);

  // Handle task input changes
  function handleOnchange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  // Add a new task
  const addTask = () => {
    if (task.taskName.trim() === "" || task.deadline === "") {
      toast.error("Please enter task, deadline, and description");
      return;
    }
    const selectedDate = new Date(task.deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Please select a valid date");
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      task,
      done: false,
    };
    axios
      .post(`${API_BASE_URL}/task/postTask`, newTask)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks([...tasks, newTask]);
    toast.success("Added Successfully");

    // Reset the form fields
    setTask({
      taskName: "",
      priority: "top",
      deadline: "",
      description: "",
    });
  };

  // Mark a task as completed
  const addToComplete = (id) => {
    const updatedTasks = tasks.map((eachTask) =>
      eachTask.id === id ? { ...eachTask, done: true } : eachTask
    );
    setTasks(updatedTasks);
    axios
      .patch(`${API_BASE_URL}/task/updateTask/${id}`, {
        done: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const completed = tasks.find((eachTask) => eachTask.id === id);
    if (completed) setCompletedTasks([...completedTasks, completed]);
  };

  // Remove a task
  const removeTask = (id) => {
    axios
      .delete(`${API_BASE_URL}/task/deleteTask/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks(tasks.filter((eachTask) => id !== eachTask.id));
    setCompletedTasks(completedTasks.filter((eachTask) => id !== eachTask.id));
  };

  // Update a task
  const updateTask = (id) => {
    const task = tasks.find((eachTask) => eachTask.id === id);
    if (task) {
      setTaskToUpdate(task); // Set the task to update
    }
  };

  // Handle task update submission
  const handleUpdateSubmit = () => {
    if (!taskToUpdate) return;

    const updatedTask = {
      taskName: taskToUpdate.task.taskName,
      description: taskToUpdate.task.description,
      priority: taskToUpdate.task.priority,
      deadline: taskToUpdate.task.deadline,
      done: taskToUpdate.done,
    };

    axios
      .patch(`${API_BASE_URL}/task/updateTask/${taskToUpdate.id}`, updatedTask)
      .then((res) => {
        const updatedTasks = tasks.map((eachTask) =>
          eachTask.id === taskToUpdate.id ? { ...eachTask, task: updatedTask } : eachTask
        );
        setTasks(updatedTasks);
        toast.success("Task updated successfully");
        setTaskToUpdate(null); // Close the update form
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update task");
      });
  };

  // Add a new activity
  const addActivity = () => {
    if (!newActivity.type || !newActivity.content) {
      toast.error("Please fill all fields");
      return;
    }

    const activity = {
      id: crypto.randomUUID(),
      type: newActivity.type, // Only type and content are needed
      content: newActivity.content,
      timestamp: new Date().toLocaleString(),
    };

    setActivities([...activities, activity]);
    setNewActivity({ type: "", content: "" }); // Reset form
    toast.success("Activity added successfully");
  };

  // Filter upcoming tasks
  const upcomingTasks = tasks.filter((eachTask) => !eachTask.done);

  // Filter tasks based on search query
  const comingFilteredItems = useMemo(() => {
    return upcomingTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [upcomingTasks, searchQuery]);

  return (
    <div className="home-body-container" data-aos="zoom-in">
      <header className="search-bar">
        <h1>Task's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </header>
      <div className="add-div">
        <input
          type="text"
          placeholder="Enter task"
          name="taskName"
          value={task.taskName || ""}
          onChange={handleOnchange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={task.description || ""}
          onChange={handleOnchange}
        />
        <select
          name="priority"
          placeholder="Select Priority"
          value={task.priority}
          onChange={handleOnchange}
        >
          <option value="top">Top priority</option>
          <option value="average">Average priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleOnchange}
        />
        <button id="add-bt" onClick={addTask}>
          Add
        </button>
      </div>
      <main className="task-body" data-aos="zoom-out">
        <h3>Current Tasks</h3>
        <div className="cur-task-list" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
                <th>Update</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {comingFilteredItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    {!eachTask.done && (
                      <button id="done-bt" onClick={() => addToComplete(eachTask.id)}>
                        Done
                      </button>
                    )}
                  </td>
                  <td>
                    {!eachTask.done && (
                      <button id="update-bt" onClick={() => updateTask(eachTask.id)}>
                        Update
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => setViewActivitiesModal(true)}>
                      View Activities
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Completed Tasks</h3>
        <div className="completed-task" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    <button id="task-remove" onClick={() => removeTask(eachTask.id)}>
                      <AiFillDelete size={20} color="#FF6969" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Update Task Modal *//*}
      {taskToUpdate && (
        <div className="update-modal">
          <h3>Update Task</h3>
          <div className="modal-content">
            <div className="modal-field">
              <label>Title</label>
              <input
                type="text"
                value={taskToUpdate.task.taskName}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, taskName: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Description</label>
              <textarea
                value={taskToUpdate.task.description}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Priority</label>
              <select
                value={taskToUpdate.task.priority}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, priority: e.target.value },
                  })
                }
              >
                <option value="top">Top priority</option>
                <option value="average">Average priority</option>
                <option value="low">Low priority</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Due Date</label>
              <input
                type="date"
                value={taskToUpdate.task.deadline}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, deadline: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={handleUpdateSubmit}>Save Changes</button>
            <button onClick={() => setTaskToUpdate(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Activities Modal *//*}
      {viewActivitiesModal && (
        <div className="activities-modal">
          <h3>Activities</h3>
          <div className="modal-content">
            <ul className="activities-list">
              {activities.map((activity) => (
                <li key={activity.id}>
                  <input type="checkbox" id={`activity-${activity.id}`} />
                  <label htmlFor={`activity-${activity.id}`}>
                    <div className="activity-header">
                      <span>{activity.type}</span>  
                    </div>
                    <div className="activity-timestamp">
                      {activity.timestamp}
                    </div>
                    <div className="activity-content">
                      {activity.content}
                    </div>
                  </label>
                </li>
              ))}
            </ul>

            <h3>Add Activity</h3>
            <div className="add-activity-form">
              <select
                value={newActivity.type}
                onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="started">Started</option>
                <option value="commented">Commented</option>
                <option value="bug">Bug</option>
              </select>
              <input
                type="text"
                placeholder="Enter content"
                value={newActivity.content}
                onChange={(e) => setNewActivity({ ...newActivity, content: e.target.value })}
              />
              <button onClick={addActivity}>Submit</button>
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={() => setViewActivitiesModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
*/
import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import "./styles/task.css";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";

// Define the API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL ||"http://localhost:8080/api";

const Task = ({ toast, tasks, setTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState({
    taskName: "",
    priority: "top",
    deadline: "",
    description: "",
  });
  const [taskToUpdate, setTaskToUpdate] = useState(null); // Track task being updated
  const [activities, setActivities] = useState([]); // Activities list
  const [newActivity, setNewActivity] = useState({
    type: "",
    content: "",
  }); // New activity input
  const [viewActivitiesModal, setViewActivitiesModal] = useState(false); // Activities modal visibility

  axios.defaults.withCredentials = true;

  useEffect(() => {
    Aos.init({ duration: 1000 });
    axios
      .get(`${API_BASE_URL}/task/getTask`)
      .then((res) => {
        let temp = res.data.filter((obj) => obj.done);
        setTasks(res.data);
        setCompletedTasks(temp);
      })
      .catch((err) => console.log(err));

    // Load activities from local storage
    const savedActivities = localStorage.getItem("activities");
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, [setTasks]);

  // Handle task input changes
  function handleOnchange(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  // Add a new task
  const addTask = () => {
    if (task.taskName.trim() === "" || task.deadline === "") {
      toast.error("Please enter task, deadline, and description");
      return;
    }
    const selectedDate = new Date(task.deadline);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Please select a valid date");
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      task,
      done: false,
    };
    axios
      .post(`${API_BASE_URL}/task/postTask`, newTask)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks([...tasks, newTask]);
    toast.success("Added Successfully");

    // Reset the form fields
    setTask({
      taskName: "",
      priority: "top",
      deadline: "",
      description: "",
    });
  };

  // Mark a task as completed
  const addToComplete = (id) => {
    const updatedTasks = tasks.map((eachTask) =>
      eachTask.id === id ? { ...eachTask, done: true } : eachTask
    );
    setTasks(updatedTasks);
    axios
      .patch(`${API_BASE_URL}/task/updateTask/${id}`, {
        done: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    const completed = tasks.find((eachTask) => eachTask.id === id);
    if (completed) setCompletedTasks([...completedTasks, completed]);
  };

  // Remove a task
  const removeTask = (id) => {
    axios
      .delete(`${API_BASE_URL}/task/deleteTask/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setTasks(tasks.filter((eachTask) => id !== eachTask.id));
    setCompletedTasks(completedTasks.filter((eachTask) => id !== eachTask.id));
  };

  // Update a task
  const updateTask = (id) => {
    const task = tasks.find((eachTask) => eachTask.id === id);
    if (task) {
      setTaskToUpdate(task); // Set the task to update
    }
  };

  // Handle task update submission
  const handleUpdateSubmit = () => {
    if (!taskToUpdate) return;

    const updatedTask = {
      taskName: taskToUpdate.task.taskName,
      description: taskToUpdate.task.description,
      priority: taskToUpdate.task.priority,
      deadline: taskToUpdate.task.deadline,
      done: taskToUpdate.done,
    };

    axios
      .patch(`${API_BASE_URL}/task/updateTask/${taskToUpdate.id}`, updatedTask)
      .then((res) => {
        const updatedTasks = tasks.map((eachTask) =>
          eachTask.id === taskToUpdate.id ? { ...eachTask, task: updatedTask } : eachTask
        );
        setTasks(updatedTasks);
        toast.success("Task updated successfully");
        setTaskToUpdate(null); // Close the update form
      })
      .catch((err) => {
        console.error("Update error:", err);
        toast.error("Failed to update task");
      });
  };

  // Add a new activity
  const addActivity = () => {
    if (!newActivity.type || !newActivity.content) {
      toast.error("Please fill all fields");
      return;
    }

    const activity = {
      id: crypto.randomUUID(),
      type: newActivity.type,
      content: newActivity.content,
      timestamp: new Date().toLocaleString(),
    };

    const updatedActivities = [...activities, activity];
    setActivities(updatedActivities);

    // Save activities to local storage
    localStorage.setItem("activities", JSON.stringify(updatedActivities));

    setNewActivity({ type: "", content: "" }); // Reset form
    toast.success("Activity added successfully");
  };

  // Filter upcoming tasks
  const upcomingTasks = tasks.filter((eachTask) => !eachTask.done);

  // Filter tasks based on search query
  const comingFilteredItems = useMemo(() => {
    return upcomingTasks.filter((eachItem) => {
      return eachItem.task.taskName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [upcomingTasks, searchQuery]);

  return (
    <div className="home-body-container" data-aos="zoom-in">
      <header className="search-bar">
        <h1>Task's</h1>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="Search"
        />
        <button id="search-bt">
          <BiSearchAlt2 size={22} />
        </button>
      </header>
      <div className="add-div">
        <input
          type="text"
          placeholder="Enter task"
          name="taskName"
          value={task.taskName || ""}
          onChange={handleOnchange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={task.description || ""}
          onChange={handleOnchange}
        />
        <select
          name="priority"
          placeholder="Select Priority"
          value={task.priority}
          onChange={handleOnchange}
        >
          <option value="top">Top priority</option>
          <option value="average">Average priority</option>
          <option value="low">Low priority</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleOnchange}
        />
        <button id="add-bt" onClick={addTask}>
          Add
        </button>
      </div>
      <main className="task-body" data-aos="zoom-out">
        <h3>Current Tasks</h3>
        <div className="cur-task-list" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
                <th>Update</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {comingFilteredItems.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    {!eachTask.done && (
                      <button id="done-bt" onClick={() => addToComplete(eachTask.id)}>
                        Done
                      </button>
                    )}
                  </td>
                  <td>
                    {!eachTask.done && (
                      <button id="update-bt" onClick={() => updateTask(eachTask.id)}>
                        Update
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => setViewActivitiesModal(true)}>
                      View Activities
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Completed Tasks</h3>
        <div className="completed-task" data-aos="zoom-in">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((eachTask) => (
                <tr key={eachTask.id}>
                  <td>{eachTask.task.taskName}</td>
                  <td>{eachTask.task.description}</td>
                  <td>{eachTask.task.priority}</td>
                  <td>{eachTask.task.deadline}</td>
                  <td>
                    <button id="task-remove" onClick={() => removeTask(eachTask.id)}>
                      <AiFillDelete size={20} color="#FF6969" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Update Task Modal */}
      {taskToUpdate && (
        <div className="update-modal">
          <h3>Update Task</h3>
          <div className="modal-content">
            <div className="modal-field">
              <label>Title</label>
              <input
                type="text"
                value={taskToUpdate.task.taskName}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, taskName: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Description</label>
              <textarea
                value={taskToUpdate.task.description}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, description: e.target.value },
                  })
                }
              />
            </div>
            <div className="modal-field">
              <label>Priority</label>
              <select
                value={taskToUpdate.task.priority}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, priority: e.target.value },
                  })
                }
              >
                <option value="top">Top priority</option>
                <option value="average">Average priority</option>
                <option value="low">Low priority</option>
              </select>
            </div>
            <div className="modal-field">
              <label>Due Date</label>
              <input
                type="date"
                value={taskToUpdate.task.deadline}
                onChange={(e) =>
                  setTaskToUpdate({
                    ...taskToUpdate,
                    task: { ...taskToUpdate.task, deadline: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={handleUpdateSubmit}>Save Changes</button>
            <button onClick={() => setTaskToUpdate(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Activities Modal */}
      {viewActivitiesModal && (
        <div className="activities-modal">
          <h3>Activities</h3>
          <div className="modal-content">
            <ul className="activities-list">
              {activities.map((activity) => (
                <li key={activity.id}>
                  <input type="checkbox" id={`activity-${activity.id}`} />
                  <label htmlFor={`activity-${activity.id}`}>
                    <div className="activity-header">
                      <span>{activity.type}</span>  
                    </div>
                    <div className="activity-timestamp">
                      {activity.timestamp}
                    </div>
                    <div className="activity-content">
                      {activity.content}
                    </div>
                  </label>
                </li>
              ))}
            </ul>

            <h3>Add Activity</h3>
            <div className="add-activity-form">
              <select
                value={newActivity.type}
                onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="started">Started</option>
                <option value="commented">Commented</option>
                <option value="bug">Bug</option>
              </select>
              <input
                type="text"
                placeholder="Enter content"
                value={newActivity.content}
                onChange={(e) => setNewActivity({ ...newActivity, content: e.target.value })}
              />
              <button onClick={addActivity}>Submit</button>
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={() => setViewActivitiesModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;