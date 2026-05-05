/*import React, { useState } from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mainpage({ toast, signIn, user }) {
  const [users, setUsers] = useState({ userName: "", email: "", password: "" });
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ Ensuring API URL is properly set
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
  
  // Debugging API URL
  console.log("API URL:", API_BASE_URL);

  const googleAuth = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const fbAuth = () => {
    window.open(`${API_BASE_URL}/auth/facebook`, "_self");
  };

  const openForgotPass = () => {
    navigate("/forgotpass");
  };

  function handleOnChange(e) {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  }

  function handleUserLogin(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Enter the details");
      return;
    }

    try {
      const result = await axios.post(`${API_BASE_URL}/api/login`, userLogin);
      console.log(result);

      if (result.data.success) {
        toast.success("Login successfully");
        user = false;
        navigate("/Home");
      } else {
        toast.error("Enter the correct details");
        setUserLogin({ email: "", password: "" });
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API_BASE_URL}/api/register`, users);
      console.log(result);

      if (result.data !== "Already Registered") {
        toast.success("Registered Successfully!");
        setUsers({ userName: "", email: "", password: "" });
        signIn();
      } else {
        toast.error(result.data);
        setUsers({ userName: "", email: "", password: "" });
        signIn();
      }
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="form-container sign-up">
        <form method="POST" onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            value={users.userName}
            onChange={handleOnChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={users.email}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={users.password}
            onChange={handleOnChange}
          />
          <button className="bt" type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form method="POST" onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email and password</span>
          <input
            type="email"
            name="email"
            value={userLogin.email}
            onChange={handleUserLogin}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={handleUserLogin}
            placeholder="Password"
          />
          <a onClick={openForgotPass} href="/forgotpass">
            Forget your password?
          </a>
          <button className="bt" type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}
*/
/*import React, { useState } from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mainpage({ toast }) {
  const [users, setUsers] = useState({ 
    userName: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ API URL Configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
  
  console.log("API URL:", API_BASE_URL); // Debugging API URL

  const googleAuth = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const fbAuth = () => {
    window.open(`${API_BASE_URL}/auth/facebook`, "_self");
  };

  const openForgotPass = () => {
    navigate("/forgotpass");
  };

  function handleOnChange(e) {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  }

  function handleUserLogin(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Enter the details");
      return;
    }

    try {
      const result = await axios.post(`${API_BASE_URL}/api/login`, userLogin);
      console.log(result);

      if (result.data.success) {
        toast.success("Login successfully");
        navigate("/home");
      } else {
        toast.error("Enter the correct details");
        setUserLogin({ email: "", password: "" });
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Email must end with @email.com
    if (!users.email.endsWith("@email.com")) {
      toast.error("Email must end with @email.com");
      return;
    }

    // ✅ Check if passwords match
    if (users.password !== users.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await axios.post(`${API_BASE_URL}/api/register`, users);
      console.log(result);

      if (result.data !== "Already Registered") {
        toast.success("Registered Successfully!");
        setUsers({ userName: "", email: "", password: "", confirmPassword: "" });

        // 🔥 Redirect to Home after successful registration
        navigate("/home");
      } else {
        toast.error(result.data);
        setUsers({ userName: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="form-container sign-up">
        <form method="POST" onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            value={users.userName}
            onChange={handleOnChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={users.email}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={users.password}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={users.confirmPassword}
            onChange={handleOnChange}
          />
          <button className="bt" type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form method="POST" onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email and password</span>
          <input
            type="email"
            name="email"
            value={userLogin.email}
            onChange={handleUserLogin}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={handleUserLogin}
            placeholder="Password"
          />
          <a onClick={openForgotPass} href="/forgotpass">
            Forget your password?
          </a>
          <button className="bt" type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}
*/
/*
import React, { useState } from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mainpage({ toast }) {
  const [users, setUsers] = useState({ 
    userName: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // ✅ API URL Configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
  
  console.log("API URL:", API_BASE_URL); // Debugging API URL

  const googleAuth = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const fbAuth = () => {
    window.open(`${API_BASE_URL}/auth/facebook`, "_self");
  };

  const openForgotPass = () => {
    navigate("/forgotpass");
  };

  function handleOnChange(e) {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  }

  function handleUserLogin(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Enter the details");
      return;
    }

    try {
      const result = await axios.post(`${API_BASE_URL}/api/login`, userLogin);
      console.log("Login Response:", result);

      if (result.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("token", result.data.token);
        navigate("/home");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!users.email.endsWith("@email.com")) {
      toast.error("Email must end with @email.com");
      return;
    }

    // Check if passwords match
    if (users.password !== users.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Step 1: Register the user
      const registerResponse = await axios.post(`${API_BASE_URL}/api/register`, users);
      console.log("Registration Response:", registerResponse.data);

      if (registerResponse.data === "Already Registered") {
        toast.error("User already registered");
        return;
      }

      toast.success("Registered Successfully!");

      // Step 2: Automatically log the user in
      const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
        email: users.email,
        password: users.password,
      });

      if (loginResponse.data.success) {
        // Step 3: Store the token in localStorage
        localStorage.setItem("token", loginResponse.data.token);
        toast.success("Login successful!");

        // Step 4: Redirect to Home
        navigate("/home");
      } else {
        toast.error("Automatic login failed. Please log in manually.");
      }
    } catch (err) {
      console.error("Registration or Login Error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      // Clear the form
      setUsers({ userName: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <>
      <div className="form-container sign-up">
        <form method="POST" onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            value={users.userName}
            onChange={handleOnChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={users.email}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={users.password}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={users.confirmPassword}
            onChange={handleOnChange}
          />
          <button className="bt" type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form method="POST" onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email and password</span>
          <input
            type="email"
            name="email"
            value={userLogin.email}
            onChange={handleUserLogin}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={userLogin.password}
            onChange={handleUserLogin}
            placeholder="Password"
          />
          <span onClick={openForgotPass} style={{ cursor: "pointer", color: "blue" }}>
            Forgot your password?
          </span>
          <button className="bt" type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}
*/
import React, { useState } from "react";
import "../App.css";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mainpage({ toast }) {
  const [users, setUsers] = useState({ 
    userName: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
  
  const googleAuth = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self");
  };

  const fbAuth = () => {
    window.open(`${API_BASE_URL}/auth/facebook`, "_self");
  };

  const openForgotPass = () => {
    navigate("/forgotpass");
  };

  function handleOnChange(e) {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  }

  function handleUserLogin(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("Enter the details");
      return;
    }
    try {
      const result = await axios.post(`${API_BASE_URL}/api/login`, userLogin);
      if (result.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("token", result.data.token);
        navigate("/home");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!users.email.endsWith("@email.com")) {
      toast.error("Email must end with @email.com");
      return;
    }
    if (users.password !== users.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const registerResponse = await axios.post(`${API_BASE_URL}/api/register`, users);
      if (registerResponse.data === "Already Registered") {
        toast.error("User already registered");
        return;
      }
      toast.success("Registered Successfully!");
      const loginResponse = await axios.post(`${API_BASE_URL}/api/login`, {
        email: users.email,
        password: users.password,
      });
      if (loginResponse.data.success) {
        localStorage.setItem("token", loginResponse.data.token);
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Automatic login failed. Please log in manually.");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setUsers({ userName: "", email: "", password: "", confirmPassword: "" });
    }
  };

  return (
    <>
      <div className="form-container sign-up">
        <form method="POST" onSubmit={handleRegister} autoComplete="off">
          <h1>Create Account</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Username" name="userName" value={users.userName} onChange={handleOnChange} autoComplete="off"/>
          <input type="email" placeholder="Email" name="email" value={users.email} onChange={handleOnChange} autoComplete="off"/>
          <input type="password" placeholder="Password" name="password" value={users.password} onChange={handleOnChange} autoComplete="new-password"/>
          <input type="password" placeholder="Confirm Password" name="confirmPassword" value={users.confirmPassword} onChange={handleOnChange} autoComplete="new-password"/>
          <button className="bt" type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form method="POST" onSubmit={handleLogin} autoComplete="off">
          <h1>Sign In</h1>
          <div className="social-icons">
            <button type="button" onClick={googleAuth} className="icon">
              <FcGoogle size={22} />
            </button>
            <button type="button" onClick={fbAuth} className="icon">
              <FaFacebook size={22} />
            </button>
          </div>
          <span>or use your email and password</span>
          <input type="email" name="email" value={userLogin.email} onChange={handleUserLogin} placeholder="Email" autoComplete="off"/>
          <input type="password" name="password" value={userLogin.password} onChange={handleUserLogin} placeholder="Password" autoComplete="new-password"/>
          <span onClick={openForgotPass} style={{ cursor: "pointer", color: "blue" }}>Forgot your password?</span>
          <button className="bt" type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}
