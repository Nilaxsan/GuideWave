import React from "react";
import { Box, Typography } from "@mui/material";

const GuideHome: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">Guide Home</Typography>
        <Typography variant="body1">
          Welcome to your dashboard, manage your bookings, places, and more.
        </Typography>
      </Box>
    </Box>
  );
};

export default GuideHome;
