import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCleanerById } from "../helpers/getCleaners";
import { getCleanerServicesById } from "../helpers/getCleanerServices"; // 🔥 import your new helper

const CleanerDetailPage = () => {
  const [cleaner, setCleaner] = useState(null);
  const [services, setServices] = useState([]);
  const { cleanerId } = useParams();

  useEffect(() => {
    const fetchCleanerDetails = async () => {
      try {
        const cleanerData = await getCleanerById(cleanerId);
        setCleaner(cleanerData);

        const serviceData = await getCleanerServicesById(cleanerId);
        setServices(serviceData);
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

      <h2>Services Offered</h2>
      {services.length === 0 ? (
        <p>No services listed.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "1rem", backgroundColor: "#fff" }}>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Hourly Rate ($)</th>
              <th>Available Days</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
                .filter((day) => service[day])
                .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
                .join(", ");

              return (
                <tr key={service.service_id}>
                  <td>{service.servicename}</td>
                  <td>{service.servicetype}</td>
                  <td>{service.description}</td>
                  <td>{Number(service.hourlyrate).toFixed(2)}</td>
                  <td>{days || "None"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CleanerDetailPage;
