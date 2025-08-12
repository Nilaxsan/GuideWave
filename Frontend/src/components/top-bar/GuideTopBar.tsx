import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  TextField,
  InputAdornment,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

interface GuideTopBarProps {
  userName?: string;
  userAvatar?: string;
}

const GuideTopBar: React.FC<GuideTopBarProps> = ({ 
  userName = "John Smith", 
  userAvatar 
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Id");
    localStorage.removeItem("Role");
    navigate("/");
    handleProfileMenuClose();
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/guide/dashboard":
        return "Dashboard";
      case "/guide/bookings":
        return "Bookings";
      case "/guide/places":
        return "Places";
      case "/guide/reviews":
        return "Review & Ratings";
      case "/guide/payments":
        return "Payments";
      case "/guide/profile":
        return "My Profile";
      default:
        return "Guide Portal";
    }
  };

  const getPageIcon = () => {
    const path = location.pathname;
    switch (path) {
      case "/guide/dashboard":
        return <DashboardIcon />;
      case "/guide/bookings":
        return <ScheduleIcon />;
      case "/guide/places":
        return <TrendingUpIcon />;
      default:
        return <DashboardIcon />;
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#F0F7F7",
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        boxShadow: "0 2px 12px rgba(11, 141, 147, 0.08)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: 3,
          py: 1,
        }}
      >
        {/* Left Section - Page Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1,
              borderRadius: "12px",
              background: alpha(theme.palette.primary.main, 0.05),
            }}
          >
            <Box
              sx={{
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
              }}
            >
              {getPageIcon()}
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              {getPageTitle()}
            </Typography>
          </Box>

      
        </Box>

        {/* Center Section - Search */}
        <Box sx={{ flex: 1, maxWidth: 400, mx: 4 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search bookings, places, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon 
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontSize: "1.2rem" 
                    }} 
                  />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "25px",
                background: alpha(theme.palette.primary.main, 0.04),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  background: alpha(theme.palette.primary.main, 0.06),
                },
                "&.Mui-focused": {
                  background: "white",
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              },
            }}
          />
        </Box>

        {/* Right Section - Time, Notifications & Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Date & Time */}
          <Box sx={{ textAlign: "right", mr: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              {getCurrentTime()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                fontSize: "0.75rem",
              }}
            >
              {getCurrentDate()}
            </Typography>
          </Box>

          {/* Notifications */}
          {/* <IconButton
            sx={{
              background: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.1),
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <Badge
              badgeContent={3}
              sx={{
                "& .MuiBadge-badge": {
                  background: theme.palette.warning.main,
                  color: "white",
                  fontSize: "0.7rem",
                  minWidth: "18px",
                  height: "18px",
                },
              }}
            >
              <NotificationsIcon 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontSize: "1.3rem"
                }} 
              />
            </Badge>
          </IconButton> */}

          {/* Settings */}
          {/* <IconButton
            sx={{
              background: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.1),
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <SettingsIcon 
              sx={{ 
                color: theme.palette.primary.main,
                fontSize: "1.3rem"
              }} 
            />
          </IconButton> */}

          {/* Profile Menu */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              borderRadius: "25px",
              background: alpha(theme.palette.primary.main, 0.05),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.1),
                transform: "scale(1.02)",
              },
            }}
            onClick={handleProfileMenuOpen}
          >
            <Avatar
              src={userAvatar}
              sx={{
                width: 36,
                height: 36,
                background: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  lineHeight: 1.2,
                }}
              >
                {userName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha(theme.palette.primary.main, 0.7),
                  fontSize: "0.7rem",
                }}
              >
                Tour Guide
              </Typography>
            </Box>
          </Box>

          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(11, 141, 147, 0.15)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                minWidth: 200,
              },
            }}
          >
            <MenuItem 
              onClick={() => {
                navigate("/guide/profile");
                handleProfileMenuClose();
              }}
              sx={{ py: 1.5 }}
            >
              <PersonIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              My Profile
            </MenuItem>

            <Divider />
            <MenuItem 
              onClick={handleLogout}
              sx={{ 
                py: 1.5,
                color: theme.palette.warning.main,
                "&:hover": {
                  background: alpha(theme.palette.warning.main, 0.1),
                },
              }}
            >
              <LogoutIcon sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default GuideTopBar;