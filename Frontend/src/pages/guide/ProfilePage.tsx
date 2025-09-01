import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Work,
  LocationOn,
  PhotoCamera,
  Save,
  Edit
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { getGuideById, Guide, updateGuide } from "../../services/guideService";
import { toast } from "react-toastify";

const GuideProfile: React.FC = () => {
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const guideId = Number(localStorage.getItem("Id"));

  // Initialize form with react-hook-form
  const { control, handleSubmit, reset, watch } = useForm<Guide>({
    defaultValues: {
      userId: 0,
      fullName: "",
      email: "",
      phoneNumber: "",
      experience: "",
      location: "",
      profile: "",
    },
  });

  const profileImageUrl = watch("profile");

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const data = await getGuideById(guideId);
        setGuide(data);
        reset(data);
      } catch (error) {
        console.error("Error fetching guide:", error);
      }
    };
    fetchGuide();
  }, [guideId, reset]);

  const onSubmit = async (data: Guide) => {
    try {
      await updateGuide(data.userId!, data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setGuide(data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      p: 4
    }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              color: "#1e293b",
              mb: 2,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Guide Profile
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#64748b",
              fontWeight: 400
            }}
          >
            Manage your guide information and professional details
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Preview Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                position: "sticky",
                top: 20
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box sx={{ mb: 3 }}>
                  <Avatar
                    src={profileImageUrl || guide?.profile}
                    alt={guide?.fullName}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: "auto",
                      mb: 2,
                      border: "4px solid #ffffff",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      backgroundColor: "#10b981",
                      color: "white",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "0.8rem",
                      fontWeight: 600
                    }}
                  >
                    Active Guide
                  </Box>
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#1e293b" }}>
                  {guide?.fullName || "Your Name"}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                    <LocationOn sx={{ color: "#ef4444", mr: 1, fontSize: 18 }} />
                    <Typography variant="body2" color="textSecondary">
                      {guide?.location || "Location"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Work sx={{ color: "#3b82f6", mr: 1, fontSize: 18 }} />
                    <Typography variant="body2" color="textSecondary">
                      Professional Guide
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant={isEditing ? "outlined" : "contained"}
                  startIcon={isEditing ? <Save /> : <Edit />}
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    ...(isEditing ? {
                      borderColor: "#3b82f6",
                      color: "#3b82f6"
                    } : {
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2563eb, #7c3aed)"
                      }
                    })
                  }}
                >
                  {isEditing ? "Cancel Edit" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Profile Form */}
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                overflow: "hidden"
              }}
            >
              {/* Form Header */}
              <Box
                sx={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  p: 3
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Profile Information
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  {isEditing ? "Update your profile details" : "View your current information"}
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 4 }}>
                  <Grid container spacing={3}>
                    {/* Full Name */}
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Person sx={{ color: "#3b82f6", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                            Full Name
                          </Typography>
                        </Box>
                        <Controller
                          name="fullName"
                          control={control}
                          render={({ field }) => (
                            <TextField 
                              {...field} 
                              fullWidth
                              disabled={!isEditing}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 3,
                                  backgroundColor: isEditing ? "#ffffff" : "#f8fafc",
                                }
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Email sx={{ color: "#10b981", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                            Email Address
                          </Typography>
                        </Box>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <TextField 
                              {...field} 
                              type="email" 
                              fullWidth
                              disabled={!isEditing}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 3,
                                  backgroundColor: isEditing ? "#ffffff" : "#f8fafc",
                                }
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Phone sx={{ color: "#f59e0b", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                            Phone Number
                          </Typography>
                        </Box>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          render={({ field }) => (
                            <TextField 
                              {...field} 
                              fullWidth
                              disabled={!isEditing}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 3,
                                  backgroundColor: isEditing ? "#ffffff" : "#f8fafc",
                                }
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    {/* Location */}
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <LocationOn sx={{ color: "#ef4444", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                            Location
                          </Typography>
                        </Box>
                        <Controller
                          name="location"
                          control={control}
                          render={({ field }) => (
                            <TextField 
                              {...field} 
                              fullWidth
                              disabled={!isEditing}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 3,
                                  backgroundColor: isEditing ? "#ffffff" : "#f8fafc",
                                }
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    {/* Experience */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Work sx={{ color: "#8b5cf6", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                            Experience & Expertise
                          </Typography>
                        </Box>
                        <Controller
                          name="experience"
                          control={control}
                          render={({ field }) => (
                            <TextField 
                              {...field} 
                              multiline
                              rows={3}
                              fullWidth
                              disabled={!isEditing}
                              placeholder="Describe your guiding experience, specialties, and expertise..."
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 3,
                                  backgroundColor: isEditing ? "#ffffff" : "#f8fafc",
                                }
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    {/* Profile Image URL */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <PhotoCamera sx={{ color: "#06b6d4", mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                            Profile Image URL
                          </Typography>
                        </Box>
                        <Controller
                          name="profile"
                          control={control}
                          render={({ field }) => (
                            <TextField 
                              {...field} 
                              fullWidth
                              disabled={!isEditing}
                              placeholder="Enter your profile image URL"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 3,
                                  backgroundColor: isEditing ? "#ffffff" : "#f8fafc",
                                }
                              }}
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  {isEditing && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setIsEditing(false);
                            }}
                          sx={{
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#e2e8f0",
                            color: "#64748b"
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<Save />}
                          sx={{
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            "&:hover": {
                              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                              transform: "translateY(-1px)",
                              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
                            },
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                            transition: "all 0.3s ease"
                          }}
                        >
                          Update Profile
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GuideProfile;