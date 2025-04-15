import React, { useState } from "react";
import { registerUser } from "../helpers/CreateAccHelper";

const CreateAcc = () => {
  const [form, setForm] = useState({
    username: "",
    emailadd: "",
    password: "",
    phone_number: "",
    homeadd: "",
    usergroup: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(form);
    alert(result.message);
  };

  return (
    <div id="b1" style={{ backgroundColor: "#efeed8", padding: "2rem" }}>
      <h1>Create a New Account</h1>
      <form className="createAccForm" onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <label>Username:</label>
        <input name="username" value={form.username} onChange={handleChange} required />

        <label>Email Address:</label>
        <input name="emailadd" type="email" value={form.emailadd} onChange={handleChange} required />

        <label>Password:</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input name="phone_number" value={form.phone_number} onChange={handleChange} />

        <label>Home Address:</label>
        <input name="homeadd" value={form.homeadd} onChange={handleChange} />

        <label>User Group:</label>
        <input name="usergroup" value={form.usergroup} onChange={handleChange} />

        <button type="submit" style={{ marginTop: "1rem" }}>Register</button>
      </form>
    </div>
  );
};

export default CreateAcc;
