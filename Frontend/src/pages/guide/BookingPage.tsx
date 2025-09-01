import React from "react";
import { Box, Typography } from "@mui/material";

const GuideBookings: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">GuideBookings</Typography>
        <Typography variant="body1">GuideBookings  page</Typography>
      </Box>
    </Box>
  );
};

export default GuideBookings;
