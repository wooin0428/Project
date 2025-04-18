import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../helpers/logoutUser";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="headerBar">
      <h3 className="headerTitle">INFINITY CLEANERS</h3>
      {!isLoginPage && (
        <Tooltip title="Logout">
          <IconButton
            className="logoutIconButton"
            onClick={() => logoutUser(navigate)}
            color="secondary"
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default Header;
