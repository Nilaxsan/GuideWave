import React from "react";
import { Box, Typography } from "@mui/material";

const GuideReviews: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">GuideReviews</Typography>
        <Typography variant="body1">GuideReviews  page</Typography>
      </Box>
    </Box>
  );
};

export default GuideReviews;
