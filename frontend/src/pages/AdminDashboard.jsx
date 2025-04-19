import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
    <Box className="admin-dashboard">
      <Typography variant="h4" className="admin-heading">
        Hello, {username} — you are at the <strong>{userGroup}</strong> dashboard
      </Typography>

      <div className="admin-menu">
        <Button variant="outlined">User Accounts</Button>
        <Button variant="outlined">User Groups</Button>
      </div>

      <Paper elevation={3}>
        <Typography className="admin-table-heading">All User Accounts</Typography>
        <Button
          className="admin-add-button"
            variant="contained"
            color="success"
            onClick={() => navigate("/createAcc")}
          >
            + Add User
        </Button>
        <TableContainer className="admin-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>User Group</strong></TableCell>
                <TableCell><strong>Edit</strong></TableCell>
                <TableCell><strong>Delete</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.useraccount_id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.usergroup}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => alert(`Edit user ${user.username} coming soon!`)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(user.useraccount_id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
