import React, { useEffect, useState } from "react";
import { getUserGroup } from "../helpers/getUserGroup";
import { getUsername } from "../helpers/getUsername";

const AdminDashboard = () => {
  const [userGroup, setUserGroup] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const group = await getUserGroup();
      const name = await getUsername();
      setUserGroup(group);
      setUsername(name);
    };
    fetchData();
  }, []);

  return (
    <div id="b1" style={{ backgroundColor: '#efeed8' }}>
      <h1>Hello, {username} — you are at {userGroup} dashboard</h1>
      <div className="cleanerListingCon">
       

      </div>
    </div>
  );
};

export default AdminDashboard;
