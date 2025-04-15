import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/session", {
      credentials: "include", // crucial for session cookies
    })
      .then(res => res.json())
      .then(data => {
        setLoggedIn(data.loggedIn);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setLoggedIn(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
