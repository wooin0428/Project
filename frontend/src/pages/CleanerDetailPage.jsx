import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCleanerById } from "../helpers/getCleaners";

const CleanerDetailPage = () => {
  const [cleaner, setCleaner] = useState(null);
  const { cleanerId } = useParams();

  useEffect(() => {
    const fetchCleanerDetails = async () => {
      try {
        const cleanerData = await getCleanerById(cleanerId);
        setCleaner(cleanerData);
      } catch (err) {
        console.error("Error fetching cleaner details:", err);
      }
    };

    fetchCleanerDetails();
  }, [cleanerId]);

  if (!cleaner) return <div>Loading...</div>;

  return (
    <div style={{ backgroundColor: "#efeed8", padding: "2rem" }}>
      <h1>{cleaner.cleanername}</h1>
      <p>Experience: {cleaner.experience} years</p>
      <p>Nationality: {cleaner.nationality}</p>
      <p>Profile Views: {cleaner.profileviewcount}</p>
      <p>Shortlist Count: {cleaner.shortlistcount}</p>
    </div>
  );
};

export default CleanerDetailPage;
