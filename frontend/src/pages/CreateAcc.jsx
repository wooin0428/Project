// pages/CreateAcc.jsx
import React from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { createAccForm } from "../helpers/createAccForm";

const CreateAcc = () => {
  const { form, userGroups, handleChange, handleSubmit } = createAccForm();

  return (
    <div className="create-acc-page">
      <Typography variant="h4" className="create-acc-heading">
        Create a New Account
      </Typography>

      <form className="create-acc-form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email Address"
          name="emailadd"
          type="email"
          value={form.emailadd}
          onChange={handleChange}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <TextField
          label="Phone Number"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
        />

        <TextField
          label="Home Address"
          name="homeadd"
          value={form.homeadd}
          onChange={handleChange}
        />

        <FormControl required>
          <InputLabel>User Group</InputLabel>
          <Select
            name="usergroup"
            value={form.usergroup}
            label="User Group"
            onChange={handleChange}
          >
            <MenuItem value="">Select a group</MenuItem>
            {userGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default CreateAcc;
