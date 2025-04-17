import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserSession from "../helpers/UserSession"; // Import UserSession

const RedirectToDashboard = () => {
  const [userSession, setUserSession] = useState(null); // Store UserSession object
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const res = await fetch("/api/session", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        // Instantiate UserSession with the fetched user data
        const user = new UserSession(data.user);
        setUserSession(user);
      } catch (err) {
        console.error("Not logged in or error fetching session");
        setUserSession(null); // No user session, redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Handle unauthorized user (if no session found)
  if (!userSession) return <Navigate to="/login" replace />;

  // Redirect based on user group
  if (userSession.isHomeowner()) return <Navigate to="/dashboard/homeowner" replace />;
  if (userSession.isAdmin()) return <Navigate to="/dashboard/admin" replace />;

  // Default fallback (if user doesn't belong to any expected group)
  return <Navigate to="/login" replace />;
};

export default RedirectToDashboard;
