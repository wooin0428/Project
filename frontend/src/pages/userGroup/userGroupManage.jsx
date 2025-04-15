import React from "react";
import "../../styles/main.css";

const UserGroupManage = () => {
  return (
    <div className="user-group-container">
      <div className="user-group-box">
        <div className="group-button-container">
          <button className="group-button">Create User Group</button>
          <button className="group-button">Manage User Group</button>
        </div>
        <div className="back-button-container">
          <button className="back-button">Back</button>
        </div>
      </div>
    </div>
  );
};

export default UserGroupManage;
