import React, { useEffect, useState } from "react";
import { getSessionInfo } from "../helpers/getSessionInfo";
import { deleteUserById } from "../helpers/deleteUser";

const AdminDashboard = () => {
  const [userGroup, setUserGroup] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username, usergroup } = await getSessionInfo();
        setUsername(username);
        setUserGroup(usergroup);

        const res = await fetch("/api/getAllUsers");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    const success = await deleteUserById(userId);
    if (success) {
      setUsers((prev) => prev.filter((u) => u.useraccount_id !== userId));
    }
  };

  return (
    <div id="b1" style={{ backgroundColor: "#efeed8", padding: "2rem" }}>
      <h1>
        Hello, {username} — you are at {userGroup} dashboard
      </h1>
      <div className="adminDashboardCon">
        <div className="adminMenuCon">
          <div>User Accounts</div>
          <div>User Groups</div>
        </div>

        <div className="adminDashboardBodyCon">
          <h2>All User Accounts</h2>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Username</th>
                <th>User Group</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.useraccount_id}>
                  <td>{user.username}</td>
                  <td>{user.usergroup}</td>
                  <td>
                    <button onClick={() => alert(`Edit user ${user.username} coming soon!`)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user.useraccount_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
