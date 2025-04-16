import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../helpers/logoutUser";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="headerBar">
      <h3>INFINITY CLEANERS</h3>
      <div className="logoutbox">
        <button onClick={() => logoutUser(navigate)}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
