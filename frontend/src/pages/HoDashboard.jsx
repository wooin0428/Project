import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionInfo } from "../helpers/getSessionInfo";
import { getCleaners } from "../helpers/getCleaners";
import { shortlistCleaner } from "../helpers/shortlistCleaner";

import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Box,
} from "@mui/material";


const HomeOwnerDashboard = () => {
  const [userGroup, setUserGroup] = useState("");
  const [username, setUsername] = useState("");
  const [cleaners, setCleaners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchCleaners = async (search = "") => {
    try {
      const cleanerData = await getCleaners(search);
      setCleaners(cleanerData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username, usergroup } = await getSessionInfo();
        setUsername(username);
        setUserGroup(usergroup);
        await fetchCleaners();
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchCleaners(searchTerm);
  };

  const handleViewCleaner = (cleanerId) => {
    navigate(`/dashboard/homeowner/${cleanerId}`);
  };

  const handleShortlist = async (cleanerId) => {
    const result = await shortlistCleaner(cleanerId);
    if (result.success) {
      alert("Cleaner added to shortlist!");
    } else {
      alert(result.error);
    }
  };

  return (
    <Container className="homeowner-dashboard">
      <Typography variant="h4" className="dashboard-heading">
        Hello, {username} — you are at {userGroup} dashboard
      </Typography>

      <Box component="form" onSubmit={handleSearch} className="cleaner-search-form">
        <TextField
          label="Search cleaner name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {cleaners.length > 0 ? (
          cleaners.map((cleaner) => (
            <Grid item xs={12} sm={6} md={4} key={cleaner.cleaner_id}>
              <Card className="cleaner-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {cleaner.cleanername}
                  </Typography>
                </CardContent>
                <CardActions className="cleaner-card-actions">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewCleaner(cleaner.cleaner_id)}
                  >
                    View Details
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleShortlist(cleaner.cleaner_id)}
                  >
                    Shortlist
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No cleaners found</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default HomeOwnerDashboard;
