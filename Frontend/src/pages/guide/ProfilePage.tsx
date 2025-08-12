import React from "react";
import { Box, Typography } from "@mui/material";

const GuideProfile: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">GuideProfile</Typography>
        <Typography variant="body1">GuideProfile  page</Typography>
      </Box>
    </Box>
  );
};

export default GuideProfile;
