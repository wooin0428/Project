import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../helpers/logoutUser";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide logout button if user is on login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="headerBar">
      <h3>INFINITY CLEANERS</h3>
      <div className="logoutbox">
        {!isLoginPage && (
          <button onClick={() => logoutUser(navigate)}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Header;
