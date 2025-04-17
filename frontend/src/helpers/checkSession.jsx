import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedGroups }) {
  const [isLoading, setIsLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/getUserGroup", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        if (allowedGroups.includes(data.usergroup)) {
          setAuthorized(true);
        }
      } catch (err) {
        console.error("Access denied:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [allowedGroups]);

  if (isLoading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" replace />;

  return children;
}
