import React from "react";
import "../../styles/main.css";

const CreateUserGroup = () => {
  return (
    <div className="create-group-container">
      <div className="create-group-box">
        <h2 className="dashboard-title">User Group Management Dashboard</h2>
        <h1 className="page-title">Create User Group</h1>

        <form className="create-group-form">
          <div className="form-row">
            <label htmlFor="groupName">User Group Name:</label>
            <input
              type="text"
              id="groupName"
              placeholder="Textbox e.g. Homeowner"
            />
          </div>

          <div className="form-row">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              rows="6"
              placeholder="Textbox"
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="create-button">
              Create
            </button>
            <button type="button" className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserGroup;