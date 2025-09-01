import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  Fade,
  Button,
  Rating,
} from "@mui/material";
import { LocationOn, Schedule, Explore, Photo, MenuBook } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getPlaceByGuideId, Place } from "../../services/place";

const GuidePlace: React.FC = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const [places, setPlaces] = useState<Place[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (guideId) {
        try {
          const data = await getPlaceByGuideId(Number(guideId));
          setPlaces(data);
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      }
    };
    fetchPlaces();
  }, [guideId]);

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
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flex: 1,
          p: 4,
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 5, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#1e293b",
              mb: 2,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Guide's Amazing Places
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#64748b",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Discover all the incredible destinations and experiences this guide
            has carefully curated for your perfect journey.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {places.map((place, index) => (
            <Grid item xs={12} sm={6} md={4} key={place.placeId}>
              <Fade in timeout={400 + index * 100}>
                <Card
                  onMouseEnter={() => setHoveredCard(place.placeId!)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform:
                      hoveredCard === place.placeId
                        ? "translateY(-12px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    boxShadow:
                      hoveredCard === place.placeId
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)"
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "6px",
                      background:
                        "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #10b981)",
                      opacity: hoveredCard === place.placeId ? 1 : 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 1,
                    },
                  }}
                >
                  {/* Image Section */}
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={place.imageUrl}
                      alt={place.placeName}
                      sx={{
                        transition: "transform 0.4s ease",
                        transform:
                          hoveredCard === place.placeId
                            ? "scale(1.08)"
                            : "scale(1)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "80px",
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderRadius: 2,
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        backdropFilter: "blur(10px)",
                        opacity: hoveredCard === place.placeId ? 1 : 0.8,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <Photo sx={{ color: "#3b82f6", fontSize: 20 }} />
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3, height: "auto" }}>
                    {/* Title */}
                    <Box display="flex" alignItems="center" mb={2}>
                      <LocationOn
                        sx={{
                          color: "#3b82f6",
                          mr: 1.5,
                          fontSize: 22,
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#1e293b",
                          lineHeight: 1.3,
                        }}
                      >
                        {place.placeName}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#64748b",
                        mb: 3,
                        lineHeight: 1.7,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontSize: "0.95rem",
                      }}
                    >
                      {place.description}
                    </Typography>

                    {/* Availability Section */}
                    <Box
                      sx={{
                        backgroundColor: "#f8fafc",
                        borderRadius: 3,
                        p: 2.5,
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <Box display="flex" alignItems="center" mb={2}>
                        <Schedule
                          sx={{
                            color: "#10b981",
                            mr: 1,
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#374151",
                          }}
                        >
                          Available Days
                        </Typography>
                      </Box>

                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {place.availability.map((day, idx) => (
                          <Chip
                            key={idx}
                            label={day}
                            size="medium"
                            sx={{
                              backgroundColor: getAvailabilityColor(day),
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.8rem",
                              height: 32,
                              "&:hover": {
                                backgroundColor: getAvailabilityColor(day),
                                filter: "brightness(1.1)",
                                transform: "translateY(-1px)",
                                boxShadow: `0 4px 12px ${getAvailabilityColor(
                                  day
                                )}40`,
                              },
                              transition: "all 0.2s ease",
                            }}
                          />
                        ))}
                      </Box>
                     
                    </Box>
                     <Button
                        variant="contained"
                        fullWidth
                        startIcon={<MenuBook />}
                        sx={{
                          backgroundColor: "primary",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                          },
                          borderRadius: 3,
                          py: 1.5,
                          mt: 3,
                          fontSize: "1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 14px rgba(59, 130, 246, 0.2)",
                        }}
                      >
                        Book
                      </Button>
                    

                  </CardContent>

                  {/* Decorative Element */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      width: 8,
                      height: 40,
                      backgroundColor: "#3b82f6",
                      borderRadius: 4,
                      opacity: hoveredCard === place.placeId ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {places.length === 0 && (
          <Paper
            sx={{
              textAlign: "center",
              py: 8,
              backgroundColor: "white",
              borderRadius: 4,
              border: "2px dashed #e2e8f0",
              mt: 4,
            }}
          >
            <Explore sx={{ fontSize: 80, color: "#cbd5e1", mb: 3 }} />
            <Typography
              variant="h5"
              color="textSecondary"
              mb={2}
              fontWeight={600}
            >
              No places available
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={4}>
              This guide hasn't added any places yet. Check back later for
              amazing destinations!
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default GuidePlace;
