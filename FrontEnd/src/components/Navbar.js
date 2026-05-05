/*import React, { useEffect } from "react";
import { LuListTodo } from "react-icons/lu";
import { IoCalendarNumber } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import axios from "axios";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import icon from "../utils/icon.PNG";
import Aos from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  function openTodo() {
    navigate("/Home/todos");
  }
  function openTask() {
    navigate("/Home/task");
  }

  function openNotes() {
    navigate("/Home/notes");
  }
  function gototDashboard() {
    navigate("/Home");
  }
  function logOut() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/logout`)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <nav className="nav-left" data-aos="fade-right">
      <button className="todo-theme">
        <img src={icon} alt="" />
      </button>
      <button onClick={gototDashboard} className="nav-icon skull">
        <BiSolidDashboard size={22} color="white" />
      </button>
      <button onClick={openTodo} className="nav-icon skull">
        <LuListTodo size={20} color="white" />
      </button>
      <button onClick={openTask} className="nav-icon skull">
        <IoCalendarNumber size={20} color="white" />
      </button>
      <button onClick={openNotes} className="nav-icon skull">
        <FaRegNoteSticky size={20} color="white" />
      </button>
      <button className="nav-icon skull" onClick={logOut}>
        <BiLogOut size={22} color="white" />
      </button>
    </nav>
  );
};

export default Navbar;
*/
/*import React, { useEffect } from "react";
import { LuListTodo } from "react-icons/lu";
import { IoCalendarNumber } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import axios from "axios";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import icon from "../utils/icon.PNG";
import Aos from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  // Get API URL from .env or fallback to localhost:8080
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  function openTodo() {
    navigate("/Home/todos");
  }

  function openTask() {
    navigate("/Home/task");
  }

  function openNotes() {
    navigate("/Home/notes");
  }

  function gotoDashboard() {
    navigate("/Home");
  }

  async function logOut() {
    console.log("Logging out via:", `${API_URL}/api/logout`); // Debugging log

    try {
      const response = await axios.get(`${API_URL}/api/logout`, { withCredentials: true });
      console.log("Logout Success:", response.data);
      
      // Redirect to login/homepage after logout
      navigate("/");
      window.location.reload(); // Ensures session is cleared on refresh
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <nav className="nav-left" data-aos="fade-right">
      <button className="todo-theme">
        <img src={icon} alt="App Icon" />
      </button>
      <button onClick={gotoDashboard} className="nav-icon skull">
        <BiSolidDashboard size={22} color="white" />
      </button>
      <button onClick={openTodo} className="nav-icon skull">
        <LuListTodo size={20} color="white" />
      </button>
      <button onClick={openTask} className="nav-icon skull">
        <IoCalendarNumber size={20} color="white" />
      </button>
      <button onClick={openNotes} className="nav-icon skull">
        <FaRegNoteSticky size={20} color="white" />
      </button>
      <button className="nav-icon skull" onClick={logOut}>
        <BiLogOut size={22} color="white" />
      </button>
    </nav>
  );
};

export default Navbar;
*/import React, { useEffect } from "react";
import { LuListTodo } from "react-icons/lu";
import { IoCalendarNumber } from "react-icons/io5";
import { FaRegNoteSticky, FaChartPie } from "react-icons/fa6"; // Import Chart Icon
import axios from "axios";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import icon from "../utils/icon.PNG";
import Aos from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  // API URL from .env or fallback to localhost:8080
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  function openTodo() {
    navigate("/Home/todos");
  }

  function openTask() {
    navigate("/Home/task");
  }

  function openNotes() {
    navigate("/Home/notes");
  }

  function gotoDashboard() {
    navigate("/Home");
  }

  function openChartPage() {
    navigate("/Home/task-status");  // Navigate to Task Completion Chart Page
  }

  async function logOut() {
    try {
      await axios.get(`${API_URL}/api/logout`);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <nav className="nav-left" data-aos="fade-right">
      <button className="todo-theme">
        <img src={icon} alt="App Icon" />
      </button>
      <button onClick={gotoDashboard} className="nav-icon skull">
        <BiSolidDashboard size={22} color="white" />
      </button>
      <button onClick={openTodo} className="nav-icon skull">
        <LuListTodo size={20} color="white" />
      </button>
      <button onClick={openTask} className="nav-icon skull">
        <IoCalendarNumber size={20} color="white" />
      </button>
      <button onClick={openNotes} className="nav-icon skull">
        <FaRegNoteSticky size={20} color="white" />
      </button>

      {/* NEW: Task Completion Chart Button */}
      <button onClick={openChartPage} className="nav-icon skull">
        <FaChartPie size={22} color="white" />
      </button>

      <button className="nav-icon skull" onClick={logOut}>
        <BiLogOut size={22} color="white" />
      </button>
    </nav>
  );
};

export default Navbar;
