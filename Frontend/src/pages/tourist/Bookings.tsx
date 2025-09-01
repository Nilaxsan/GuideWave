import React from "react";
import { Box, Typography } from "@mui/material";

const TouristBookings: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">My Bookings</Typography>
        <Typography variant="body1">
          Check your upcoming guide bookings, past trips, and manage reservations.
        </Typography>
      </Box>
    </Box>
  );
};

export default TouristBookings;
