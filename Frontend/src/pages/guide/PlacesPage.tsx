import React from "react";
import { Box, Typography } from "@mui/material";

const GuidePlaces: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">GuidePlaces</Typography>
        <Typography variant="body1">GuidePlaces  page</Typography>
      </Box>
    </Box>
  );
};

export default GuidePlaces;
