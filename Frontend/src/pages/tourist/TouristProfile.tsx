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
  Flag,
  PhotoCamera,
  Save,
  Edit,
  Lock,
  Badge,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { getTouristById, updateTourist } from "../../services/touristService";
import { toast } from "react-toastify";
import { TouristsDto } from "../../components/data/Tourist";

const TouristProfile: React.FC = () => {
  const [tourist, setTourist] = useState<TouristsDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const touristId = Number(localStorage.getItem("Id"));

  // react-hook-form setup
  const { control, handleSubmit, reset, watch } = useForm<TouristsDto>({
    defaultValues: {
      userId: 0,
      fullName: "",
      email: "",
      password: "",
      role: "Tourist",
      phoneNumber: "",
      country: "",
      profile: "",
    },
  });

  const profileImageUrl = watch("profile");

  useEffect(() => {
    const fetchTourist = async () => {
      try {
        const data = await getTouristById(touristId);
        setTourist(data);
        reset(data);
      } catch (error) {
        console.error("Error fetching tourist:", error);
      }
    };
    fetchTourist();
  }, [touristId, reset]);

  const onSubmit = async (data: TouristsDto) => {
    try {
      await updateTourist(data.userId!, data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setTourist(data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", p: 4 }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#1e293b",
              mb: 2,
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Tourist Profile
          </Typography>
          <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 400 }}>
            Manage your tourist information and account details
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                position: "sticky",
                top: 20,
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Avatar
                  src={profileImageUrl || tourist?.profile}
                  alt={tourist?.fullName}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid #ffffff",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {tourist?.fullName || "Your Name"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {tourist?.country || "Country"}
                </Typography>

                <Button
                  variant={isEditing ? "outlined" : "contained"}
                  startIcon={isEditing ? <Save /> : <Edit />}
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    ...(isEditing
                      ? { borderColor: "#3b82f6", color: "#3b82f6" }
                      : {
                          background:
                            "linear-gradient(135deg, #06b6d4, #3b82f6)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #0ea5e9, #2563eb)",
                          },
                        }),
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
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "white",
                  p: 3,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Profile Information
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                  {isEditing
                    ? "Update your profile details"
                    : "View your current information"}
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 4 }}>
                  <Grid container spacing={3}>
                    {/* Full Name */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        icon={<Person sx={{ color: "#3b82f6", mr: 1 }} />}
                        label="Full Name"
                        name="fullName"
                        control={control}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        icon={<Email sx={{ color: "#10b981", mr: 1 }} />}
                        label="Email"
                        name="email"
                        control={control}
                        disabled={!isEditing}
                        type="email"
                      />
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        icon={<Phone sx={{ color: "#f59e0b", mr: 1 }} />}
                        label="Phone Number"
                        name="phoneNumber"
                        control={control}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        icon={<Flag sx={{ color: "#ef4444", mr: 1 }} />}
                        label="Country"
                        name="country"
                        control={control}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/* Role */}
                    <Grid item xs={12} sm={6}>
                      <Field
                        icon={<Badge sx={{ color: "#8b5cf6", mr: 1 }} />}
                        label="Role"
                        name="role"
                        control={control}
                        disabled
                      />
                    </Grid>

              

                    {/* Profile Image */}
                    <Grid item xs={12}>
                      <Field
                        icon={<PhotoCamera sx={{ color: "#06b6d4", mr: 1 }} />}
                        label="Profile Image URL"
                        name="profile"
                        control={control}
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>

                  {isEditing && (
                    <>
                      <Divider sx={{ my: 3 }} />
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => setIsEditing(false)}
                          sx={{
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
                            borderColor: "#e2e8f0",
                            color: "#64748b",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          startIcon={<Save />}
                          sx={{
                            background:
                              "linear-gradient(135deg, #06b6d4, #3b82f6)",
                            "&:hover": {
                              background:
                                "linear-gradient(135deg, #0ea5e9, #2563eb)",
                            },
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            textTransform: "none",
                            fontWeight: 600,
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

// 🔹 Reusable Field Component
interface FieldProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  control: any;
  disabled?: boolean;
  type?: string;
}
const Field: React.FC<FieldProps> = ({
  icon,
  label,
  name,
  control,
  disabled,
  type = "text",
}) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      {icon}
      <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
        {label}
      </Typography>
    </Box>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          fullWidth
          disabled={disabled}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: disabled ? "#f8fafc" : "#ffffff",
            },
          }}
        />
      )}
    />
  </Box>
);

export default TouristProfile;
