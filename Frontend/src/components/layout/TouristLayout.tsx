import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TouristSidebar from "../side-bar/TouristSidebar";
import TouristTopBar from "../top-bar/TouristTopBar";

const TouristLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <TouristSidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Bar */}
        <TouristTopBar
          userName="Alice Doe" // TODO: Make dynamic (localStorage, API, or context)
          // userAvatar="/path/to/avatar.jpg" // Optional avatar
        />

        {/* Page Content */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "white",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default TouristLayout;
