// src/helpers/RedirectToDashboard.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RedirectToDashboard = () => {
  const [userGroup, setUserGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch("/api/getUserGroup", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUserGroup(data.usergroup);
      } catch (err) {
        console.error("Not logged in or error fetching group");
        setUserGroup("UNAUTHORIZED");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Handle unauthorized user
  if (userGroup === "UNAUTHORIZED") return <Navigate to="/login" replace />;

  // Redirect based on user group
  if (userGroup === "HOMEOWNER") return <Navigate to="/dashboard/homeowner" replace />;
  if (userGroup === "USER ADMIN") return <Navigate to="/dashboard/admin" replace />;

  // Default fallback
  return <Navigate to="/login" replace />;
};

export default RedirectToDashboard;