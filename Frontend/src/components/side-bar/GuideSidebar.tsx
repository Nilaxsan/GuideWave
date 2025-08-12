import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Typography,
  Avatar,
  Fade,
  useTheme,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  BookOnline as BookingsIcon,
  Place as PlacesIcon,
  Star as ReviewIcon,
  Payment as PaymentIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  TravelExplore as GuideIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const GuideSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItemsTop = [
    { text: "Dashboard", path: "/guide/home", icon: <DashboardIcon /> },
    { text: "Bookings", path: "/guide/bookings", icon: <BookingsIcon /> },
    { text: "Places", path: "/guide/places", icon: <PlacesIcon /> },
    { text: "Review & Ratings", path: "/guide/reviews", icon: <ReviewIcon /> },
    { text: "Payments", path: "/guide/payments", icon: <PaymentIcon /> },
  ];

  const menuItemsBottom = [
    { text: "My Profile", path: "/guide/profile", icon: <ProfileIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    localStorage.removeItem("Role");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #087d83 100%)`,
        boxShadow: "4px 0 20px rgba(11, 141, 147, 0.15)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "1px",
          height: "100%",
          background: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mx: "auto",
            mb: 2,
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            fontSize: "1.5rem",
            fontWeight: "bold",
            boxShadow: "0 8px 24px rgba(246, 215, 169, 0.3)",
          }}
        >
          <GuideIcon fontSize="large" />
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Guide Portal
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            mt: 0.5,
          }}
        >
          Welcome back!
        </Typography>
      </Box>

      {/* Navigation Section */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 1 }}>
          {menuItemsTop.map((item, index) => (
            <Fade in={true} timeout={300 + index * 100} key={item.text}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.text)}
                onMouseLeave={() => setHoveredItem(null)}
                sx={{
                  mb: 1,
                  mx: 1,
                  borderRadius: "12px",
                  minHeight: 50,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: isActive(item.path)
                    ? "rgba(255, 255, 255, 0.15)"
                    : hoveredItem === item.text
                    ? "rgba(255, 255, 255, 0.08)"
                    : "transparent",
                  backdropFilter: isActive(item.path) ? "blur(10px)" : "none",
                  border: isActive(item.path)
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid transparent",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: isActive(item.path) ? "4px" : "0px",
                    background: theme.palette.secondary.main,
                    transition: "width 0.3s ease",
                    borderRadius: "0 4px 4px 0",
                  },
                  "&:hover": {
                    transform: "translateX(8px)",
                    background: "rgba(255, 255, 255, 0.12)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive(item.path)
                      ? theme.palette.secondary.main
                      : "rgba(255, 255, 255, 0.8)",
                    minWidth: 40,
                    transition: "all 0.3s ease",
                    transform:
                      hoveredItem === item.text ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: {
                      color: isActive(item.path)
                        ? "white"
                        : "rgba(255, 255, 255, 0.9)",
                      fontWeight: isActive(item.path) ? 600 : 500,
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    },
                  }}
                />
                {isActive(item.path) && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 12,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: theme.palette.secondary.main,
                      boxShadow: `0 0 8px ${theme.palette.secondary.main}`,
                    }}
                  />
                )}
              </ListItemButton>
            </Fade>
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <Divider
          sx={{
            mb: 2,
            background: "rgba(255, 255, 255, 0.1)",
          }}
        />

        <List sx={{ px: 1 }}>
          {menuItemsBottom.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.text)}
              onMouseLeave={() => setHoveredItem(null)}
              sx={{
                mb: 1,
                mx: 1,
                borderRadius: "12px",
                minHeight: 50,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                background: isActive(item.path)
                  ? "rgba(255, 255, 255, 0.15)"
                  : hoveredItem === item.text
                  ? "rgba(255, 255, 255, 0.08)"
                  : "transparent",
                "&:hover": {
                  transform: "translateX(8px)",
                  background: "rgba(255, 255, 255, 0.12)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path)
                    ? theme.palette.secondary.main
                    : "rgba(255, 255, 255, 0.8)",
                  minWidth: 40,
                  transition: "all 0.3s ease",
                  transform:
                    hoveredItem === item.text ? "scale(1.1)" : "scale(1)",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    color: isActive(item.path)
                      ? "white"
                      : "rgba(255, 255, 255, 0.9)",
                    fontWeight: isActive(item.path) ? 600 : 500,
                    fontSize: "0.95rem",
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Button
          variant="contained"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            width: "100%",
            mt: 2,
            mx: 1,
            borderRadius: "12px",
            py: 1.5,
            background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, #e65100 100%)`,
            color: "white",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.95rem",
            boxShadow: "0 4px 16px rgba(245, 124, 0, 0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: `linear-gradient(135deg, #e65100 0%, #bf360c 100%)`,
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(245, 124, 0, 0.4)",
            },
            "&:active": {
              transform: "translateY(0px)",
            },
          }}
        >
          Logout
        </Button>

        {/* Decorative Footer */}
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "0.75rem",
            }}
          >
            © {new Date().getFullYear()} GuideWave. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GuideSidebar;
