import React, { useEffect, useState } from "react";
import { getUserGroup } from "../helpers/getUserGroup";

const Dashboard = () => {
  const [userGroup, setUserGroup] = useState("");

  useEffect(() => {
    const fetchGroup = async () => {
      const group = await getUserGroup();
      setUserGroup(group);
    };
    fetchGroup();
  }, []);

  return (
    <div id="b1" style={{ backgroundColor: '#efeed8' }}>
      <h1>Hello, you are logged in. Your user group is: {userGroup}</h1>
    </div>
  );
};

export default Dashboard;
