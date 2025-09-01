import React from "react";
import { Box, Typography } from "@mui/material";

const TouristTrips: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">My Trips</Typography>
        <Typography variant="body1">
          Keep track of your planned, ongoing, and completed trips all in one place.
        </Typography>
      </Box>
    </Box>
  );
};

export default TouristTrips;
