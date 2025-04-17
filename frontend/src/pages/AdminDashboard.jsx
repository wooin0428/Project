import React, { useEffect, useState } from "react";
import UserSession from "../classes/UserSession"; // Import the UserSession class

const HoDashboard = () => {
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    // Assuming you have the user session stored somewhere, like in localStorage, or from your current app state
    const storedUserSession = JSON.parse(localStorage.getItem("userSession"));

    if (storedUserSession) {
      const user = new UserSession(storedUserSession); // Create the UserSession instance
      setUserSession(user); // Store the user session instance in state
    }
  }, []);

  if (!userSession) {
    return <div>Loading...</div>; // Or redirect to login page if session is not found
  }

  return (
    <div id="b1" style={{ backgroundColor: '#efeed8' }}>
      <h1>Hello, {userSession.username} — you are at {userSession.group} dashboard</h1>
      <div className="cleanerListingCon">
        <div className="cleanerListingBox">
          <h2> ADMIN PAGE!! </h2>
          
          
        </div>
      </div>
    </div>
  );
};

export default HoDashboard;
