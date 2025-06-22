/*import React, { useEffect, useState } from "react";
import DarkMode from "./DarkMode/Darkmode";
import Notification from "./Notification/Notification";
import { IoMdNotifications } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import TypeWriter from "typewriter-effect";
import Calendar from "./Calendar/Calendar";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const Profile = ({ tasks }) => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [user, setUser] = useState();
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [dialog, setDialog] = useState({
    isLoading: false,
  });

  axios.defaults.withCredentials = true;
  useEffect(() => {
    Aos.init({ duration: 1200 });
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((quotes) => {
        setQuote(quotes.content);
        setAuthor(quotes.author);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/getUser`)
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/task/getTask`)
      .then((res) => {
        let temp = res.data.filter(
          (obj) =>
            obj.done === false &&
            obj.task.deadline === new Date().toISOString().split("T")[0]
        );
        setUpcomingTasks(temp);
      })
      .catch((err) => console.log(err));
  }, [tasks]);

  console.log(upcomingTasks);

  const reloadQuote = () => {
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((quotes) => {
        setQuote(quotes.content);
        setAuthor(quotes.author);
      });
  };

  function openNotifi() {
    setDialog({ isLoading: true });
  }
  function closeNotifi() {
    setDialog({ isLoading: false });
  }
  return (
    <React.Fragment>
      <div className="profile" data-aos="fade-left">
        <div className="profile-div">
          <DarkMode />
          <button
            className={`${upcomingTasks.length ? " bell" : ""}`}
            onClick={openNotifi}
          >
            <span id="noti-count">{upcomingTasks.length}</span>
            <span>
              <IoMdNotifications size={25} color="#3081D0" />
            </span>
          </button>
          <img
            title={user && `${user.userName}`}
            id="prof-img"
            src={user && `${user.picUrl}`}
            alt=""
          />
        </div>
        {dialog.isLoading && (
          <Notification
            closeNotifi={closeNotifi}
            upcomingTasks={upcomingTasks}
          />
        )}
        <Calendar />
        <div className="quote-div" data-aos="zoom-in">
          <h3>
            <TypeWriter
              options={{
                autoStart: true,
                loop: true,
                delay: 100,
                strings: [`" ${quote} "`],
              }}
            />
          </h3>
          <hr />
          <div className="quote-footer">
            <h4 id="auth-name"> - {author}</h4>
            <button onClick={reloadQuote}>
              <TfiReload color="orangered" size={18} />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
*/
/*
import React, { useEffect, useState } from "react";
import DarkMode from "./DarkMode/Darkmode";
import Notification from "./Notification/Notification";
import { IoMdNotifications } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import TypeWriter from "typewriter-effect";
import Calendar from "./Calendar/Calendar";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

// Define the API base URL
const API_BASE_URL = "http://localhost:8080/api";

const Profile = ({ tasks }) => {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [user, setUser] = useState();
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [dialog, setDialog] = useState({
    isLoading: false,
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    Aos.init({ duration: 1200 });

    // Fetch a random quote
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((quotes) => {
        setQuote(quotes.content);
        setAuthor(quotes.author);
      });

    // Fetch user data
    axios
      .get(`${API_BASE_URL}/getUser`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch tasks for the current date
    axios
      .get(`${API_BASE_URL}/task/getTask`)
      .then((res) => {
        const today = new Date().toISOString().split("T")[0];
        const temp = res.data.filter(
          (obj) => obj.done === false && obj.task.deadline === today
        );
        setUpcomingTasks(temp);
      })
      .catch((err) => console.log(err));
  }, [tasks]);

  console.log(upcomingTasks);

  // Reload a new random quote
  const reloadQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((quotes) => {
        setQuote(quotes.content);
        setAuthor(quotes.author);
      });
  };

  // Open notification dialog
  function openNotifi() {
    setDialog({ isLoading: true });
  }

  // Close notification dialog
  function closeNotifi() {
    setDialog({ isLoading: false });
  }

  return (
    <React.Fragment>
      <div className="profile" data-aos="fade-left">
        <div className="profile-div">
          <DarkMode />
          <button
            className={`${upcomingTasks.length ? " bell" : ""}`}
            onClick={openNotifi}
          >
            <span id="noti-count">{upcomingTasks.length}</span>
            <span>
              <IoMdNotifications size={25} color="#3081D0" />
            </span>
          </button>
          <img
            title={user && `${user.userName}`}
            id="prof-img"
            src={user && `${user.picUrl}`}
            alt=""
          />
        </div>
        {dialog.isLoading && (
          <Notification
            closeNotifi={closeNotifi}
            upcomingTasks={upcomingTasks}
          />
        )}
        <Calendar />
        <div className="quote-div" data-aos="zoom-in">
          <h3>
            <TypeWriter
              options={{
                autoStart: true,
                loop: true,
                delay: 100,
                strings: [`" ${quote} "`],
              }}
            />
          </h3>
          <hr />
          <div className="quote-footer">
            <h4 id="auth-name"> - {author}</h4>
            <button onClick={reloadQuote}>
              <TfiReload color="orangered" size={18} />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
*/
import React, { useEffect, useState, useCallback } from "react";
import DarkMode from "./DarkMode/Darkmode";
import Notification from "./Notification/Notification";
import { IoMdNotifications } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import TypeWriter from "typewriter-effect";
import Calendar from "./Calendar/Calendar";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const API_BASE_URL = "http://localhost:8080/api";

// Local fallback quotes
const FALLBACK_QUOTES = [
  { content: "The only way to do great work is to love what you do", author: "Steve Jobs" },
  { content: "Stay hungry, stay foolish", author: "Steve Jobs" },
  { content: "Your time is limited, don't waste it living someone else's life", author: "Steve Jobs" }
];

const Profile = ({ tasks }) => {
  const [quoteData, setQuoteData] = useState(() => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
    return FALLBACK_QUOTES[randomIndex];
  });
  const [user, setUser] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const getRandomFallbackQuote = () => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
    return FALLBACK_QUOTES[randomIndex];
  };

  const fetchQuote = useCallback(async () => {
    setIsQuoteLoading(true);
    try {
      const response = await axios.get('https://api.quotable.io/random', {
        timeout: 5000
      });
      setQuoteData({
        content: response.data.content,
        author: response.data.author
      });
    } catch (error) {
      console.log("Using fallback quote:", error.message);
      setQuoteData(getRandomFallbackQuote());
    } finally {
      setIsQuoteLoading(false);
    }
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1200 });
    fetchQuote();

    axios.get(`${API_BASE_URL}/getUser`)
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, [fetchQuote]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/task/getTask`)
      .then((res) => {
        const today = new Date().toISOString().split("T")[0];
        const temp = res.data.filter(
          (obj) => obj.done === false && obj.task.deadline === today
        );
        setUpcomingTasks(temp);
      })
      .catch(console.error);
  }, [tasks]);

  return (
    <div className="profile" data-aos="fade-left">
      <div className="profile-div">
        <DarkMode />
        <button
          className={`${upcomingTasks.length ? "bell" : ""}`}
          onClick={() => setShowNotification(true)}
        >
          {upcomingTasks.length > 0 && (
            <span id="noti-count">{upcomingTasks.length}</span>
          )}
          <span>
            <IoMdNotifications size={25} color="#3081D0" />
          </span>
        </button>
        {user && (
          <img
            title={user.userName}
            id="prof-img"
            src={user.picUrl}
            alt="Profile"
          />
        )}
      </div>

      {showNotification && (
        <Notification
          closeNotifi={() => setShowNotification(false)}
          upcomingTasks={upcomingTasks}
        />
      )}

      <Calendar />

      <div className="quote-div" data-aos="zoom-in">
        <h3>
          <TypeWriter
            options={{
              autoStart: true,
              loop: true,
              delay: 100,
              strings: [`" ${quoteData.content} "`],
            }}
          />
        </h3>
        <hr />
        <div className="quote-footer">
          <h4 id="auth-name"> - {quoteData.author}</h4>
          <button onClick={fetchQuote} disabled={isQuoteLoading}>
            <TfiReload color="orangered" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;