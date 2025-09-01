import React from "react";
import { Box, Typography } from "@mui/material";

const TouristHome: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">Tourist Home</Typography>
        <Typography variant="body1">
          Welcome to Guidewave! Explore destinations, book guides, and manage your trips.
        </Typography>
      </Box>
    </Box>
  );
};

export default TouristHome;
