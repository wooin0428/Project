import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../helpers/AuthLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Check if already logged in using /api/session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/session", {
          credentials: "include",
        });
        const data = await res.json();

        if (data.loggedIn) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    checkSession();
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({ username, password });
  
    if (result.success) {
      // On successful login, create a UserSession object
      const user = new UserSession(result.user); // Now includes `usergroup`
      navigate("/dashboard"); // Redirect to the user's dashboard
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <div style={{ backgroundColor: "#efeed8", padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br /><br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br /><br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../helpers/AuthLogin";
import UserSession from "../helpers/UserSession"; // Import UserSession

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Check if already logged in using /api/session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/session", {
          credentials: "include",
        });
        const data = await res.json();

        if (data.loggedIn) {
          const user = new UserSession(data.user); // Instantiate UserSession
          navigate(user.getDashboardRoute()); // Redirect based on user role
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({ username, password });

    if (result.success) {
      // On successful login, create a UserSession object
      const user = new UserSession(result.user);
      navigate(user.getDashboardRoute()); // Redirect to the user's dashboard
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <div style={{ backgroundColor: "#efeed8", padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
