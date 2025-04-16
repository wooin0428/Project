import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../helpers/AuthLogin";
import RedirectIfLoggedIn from "../helpers/RedirectIfLoggedIn";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser({ username, password });

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <RedirectIfLoggedIn>
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
    </RedirectIfLoggedIn>
  );
};

export default Login;
