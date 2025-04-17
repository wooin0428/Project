import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionInfo } from "../helpers/getSessionInfo";
import { getCleaners } from "../helpers/getCleaners";
import { Outlet } from "react-router-dom";

const HomeOwnerDashboard = () => {
  const [userGroup, setUserGroup] = useState("");
  const [username, setUsername] = useState("");
  const [cleaners, setCleaners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get session info (username and usergroup)
        const { username, usergroup } = await getSessionInfo();
        setUsername(username);
        setUserGroup(usergroup);

        // Fetch cleaner data
        const cleanerData = await getCleaners();
        setCleaners(cleanerData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleViewCleaner = (cleanerId) => {
    // Navigate to the cleaner detail page using cleaner ID
    navigate(`/dashboard/homeowner/cleaners/${cleanerId}`);
  };

  return (
    <div id="b1" style={{ backgroundColor: '#efeed8' }}>
      <h1>Hello, {username} — you are at {userGroup} dashboard</h1>
      <div className="cleanerListingCon">
        {cleaners.length > 0 ? (
          cleaners.map((cleaner) => (
            <div key={cleaner.cleaner_id} className="cleanerListingBox">
              <h3>{cleaner.cleanername}</h3>
              <button onClick={() => handleViewCleaner(cleaner.cleaner_id)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No cleaners available</p>
        )}
      </div>
      
    </div>
  );
};

export default HomeOwnerDashboard;
