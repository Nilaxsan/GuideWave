import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GuideSidebar from "../side-bar/GuideSidebar";
import GuideTopBar from "../top-bar/GuideTopBar";

const GuideLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <GuideSidebar />

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
        <GuideTopBar 
          userName="John Smith" // You can make this dynamic by getting from localStorage or context
          // userAvatar="/path/to/avatar.jpg" // Optional: add user avatar
        />

        {/* Page Content */}
        <Box 
          sx={{ 
            flex: 1,
            p: 3, 
            bgcolor:"white", 
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default GuideLayout;