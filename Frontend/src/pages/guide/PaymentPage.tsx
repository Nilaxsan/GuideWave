import React from "react";
import { Box, Typography } from "@mui/material";

const GuidePayments: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4">GuidePayments</Typography>
        <Typography variant="body1">GuidePayments  page</Typography>
      </Box>
    </Box>
  );
};

export default GuidePayments;
