import React, { useEffect, useState } from "react";
import { getSessionInfo } from "../helpers/getSessionInfo";

const AdminDashboard = () => {
  const [userGroup, setUserGroup] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username, usergroup } = await getSessionInfo();
        setUsername(username);
        setUserGroup(usergroup);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="b1" style={{ backgroundColor: '#efeed8' }}>
      <h1>Hello, {username} — you are at {userGroup} dashboard</h1>
      <div className="cleanerListingCon">
        <div className="cleanerListingBox">
          MARIA
          <br></br>
          VIEW MORE
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
