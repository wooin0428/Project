import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RedirectIfLoggedIn = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/session", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setLoggedIn(data.loggedIn);
        setIsLoading(false);
      })
      .catch(() => {
        setLoggedIn(false);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return loggedIn ? <Navigate to="/dashboard" replace /> : children;
};

export default RedirectIfLoggedIn;
