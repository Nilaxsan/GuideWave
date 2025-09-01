import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Chip,
  Paper,
  Fade,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add, Edit, Delete, LocationOn, Schedule } from "@mui/icons-material";
import { getPlaceByGuideId, deletePlace, Place } from "../../services/place";
import PlaceModal from "../../components/guide/PlaceModal";
import { toast } from "react-toastify";

const PlacesPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editPlace, setEditPlace] = useState<Place | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [guideId, setGuideId] = useState<number >(0);


  const fetchPlaces = async () => {
    try {
      const data = await getPlaceByGuideId(guideId);
      setPlaces(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load places");
      setPlaces([]);
    }
  };

useEffect(() => {
  const storedId = localStorage.getItem("Id");
  if (storedId) {
    setGuideId(Number(storedId));
  }
}, []);

useEffect(() => {
  if (guideId) {
    fetchPlaces();
  }
}, [guideId]);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deletePlace(deleteId);
      toast.success("Place deleted");
      fetchPlaces();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const formatAvailability = (availability: string[]) => {
    if (!availability || availability.length === 0) return [];
    return availability;
  };

  const getAvailabilityColor = (day: string) => {
    const colors = {
      Monday: "#1976d2",
      Tuesday: "#388e3c",
      Wednesday: "#f57c00",
      Thursday: "#7b1fa2",
      Friday: "#d32f2f",
      Saturday: "#0288d1",
      Sunday: "#5d4037",
    };
    return colors[day as keyof typeof colors] || "#666";
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#1e293b",
              mb: 1,
            }}
          >
            My Places
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your travel destinations and experiences
          </Typography>
        </Box>
        <Button
          startIcon={<Add />}
          variant="contained"
          size="large"
          onClick={() => {
            setEditPlace(null);
            setOpenModal(true);
          }}
          sx={{
            backgroundColor: "primary",
            borderRadius: 3,
            px: 3,
            py: 1.5,
            boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.3)",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Add New Place
        </Button>
      </Box>

      <Grid container spacing={3}>
        {places.map((place, index) => (
          <Grid item xs={12} sm={6} md={4} key={place.placeId}>
            <Fade in timeout={300 + index * 100}>
              <Card
                onMouseEnter={() => setHoveredCard(place.placeId!)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform:
                    hoveredCard === place.placeId
                      ? "translateY(-8px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredCard === place.placeId
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
                    opacity: hoveredCard === place.placeId ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={place.imageUrl}
                    alt={place.placeName}
                    sx={{
                      transition: "transform 0.3s ease",
                      transform:
                        hoveredCard === place.placeId
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      display: "flex",
                      gap: 1,
                      opacity: hoveredCard === place.placeId ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditPlace(place);
                        setOpenModal(true);
                      }}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#3b82f6",
                        "&:hover": {
                          backgroundColor: "#3b82f6",
                          color: "white",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(place.placeId!);
                      }}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#ef4444",
                        "&:hover": {
                          backgroundColor: "#ef4444",
                          color: "white",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      height: "60px",
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <LocationOn
                      sx={{ color: "#3b82f6", mr: 1, fontSize: 20 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1e293b",
                        lineHeight: 1.2,
                      }}
                    >
                      {place.placeName}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      mb: 3,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {place.description}
                  </Typography>

                  <Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Schedule
                        sx={{ color: "#64748b", mr: 1, fontSize: 18 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#374151",
                        }}
                      >
                        Available Days
                      </Typography>
                    </Box>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {formatAvailability(place.availability).map(
                        (day, idx) => (
                          <Chip
                            key={idx}
                            label={day}
                            size="small"
                            sx={{
                              backgroundColor: getAvailabilityColor(day),
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              "&:hover": {
                                backgroundColor: getAvailabilityColor(day),
                                filter: "brightness(1.1)",
                              },
                            }}
                          />
                        )
                      )}
                    </Box>
                  </Box>
                </CardContent>

                {/* Action buttons for mobile - always visible on small screens */}
                <Box
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    justifyContent: "flex-end",
                    gap: 1,
                    p: 2,
                    pt: 0,
                  }}
                >
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => {
                      setEditPlace(place);
                      setOpenModal(true);
                    }}
                    sx={{
                      color: "#3b82f6",
                      "&:hover": { backgroundColor: "rgba(59, 130, 246, 0.1)" },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteClick(place.placeId!)}
                    sx={{
                      color: "#ef4444",
                      "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.1)" },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {places.length === 0 && (
        <Paper
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "white",
            borderRadius: 4,
            border: "2px dashed #e2e8f0",
          }}
        >
          <LocationOn sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }} />
          <Typography variant="h6" color="textSecondary" mb={1}>
            No places added yet
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Start building your guide by adding your first place
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              setEditPlace(null);
              setOpenModal(true);
            }}
            sx={{
              backgroundColor: "primary",
              borderRadius: 3,
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add Your First Place
          </Button>
        </Paper>
      )}

      {/* Modal for Create/Edit */}
      <PlaceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        place={editPlace}
        guideId={guideId}
        onSuccess={fetchPlaces}
      />
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this place? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlacesPage;
