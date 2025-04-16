import { useState, useEffect } from "react";
import { registerUser } from "./CreateAccHelper";
import { getAllUserGroups } from "./getAllUserGroups";

export const createAccForm = () => {
  const [form, setForm] = useState({
    username: "",
    emailadd: "",
    password: "",
    phone_number: "",
    homeadd: "",
    usergroup: ""
  });

  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const loadGroups = async () => {
      const groups = await getAllUserGroups();
      setUserGroups(groups);
    };
    loadGroups();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(form);
    alert(result.message);
  };

  return {
    form,
    userGroups,
    handleChange,
    handleSubmit
  };
};
