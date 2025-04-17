import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionInfo } from "../helpers/getSessionInfo";
import { getCleaners } from "../helpers/getCleaners";

const HomeOwnerDashboard = () => {
  const [userGroup, setUserGroup] = useState("");
  const [username, setUsername] = useState("");
  const [cleaners, setCleaners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchCleaners = async (search = "") => {
    try {
      const cleanerData = await getCleaners(search);
      setCleaners(cleanerData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username, usergroup } = await getSessionInfo();
        setUsername(username);
        setUserGroup(usergroup);
        await fetchCleaners();
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchCleaners(searchTerm);
  };

  const handleViewCleaner = (cleanerId) => {
    navigate(`/dashboard/homeowner/${cleanerId}`);
  };

  return (
    <div id="b1" style={{ backgroundColor: '#efeed8' }}>
      <h1>Hello, {username} — you are at {userGroup} dashboard</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search cleaner name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

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
          <p>No cleaners found</p>
        )}
      </div>
    </div>
  );
};

export default HomeOwnerDashboard;
