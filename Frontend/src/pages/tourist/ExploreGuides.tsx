import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Paper,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Star,
  WorkOutline,
  Explore,
  TravelExplore,
  StarBorder,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getGuides, Guide } from "../../services/guideService";
import {
  createReview,
  getReviewsByGuideId,
  Review,
} from "../../services/reviewService";
import { toast } from "react-toastify";
import GuideReviewsModal from "../../components/tourist/GuideReviewsModal";

const ExploreGuides: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedGuideId, setSelectedGuideId] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(0);
  const [feedback, setFeedback] = useState("");

  const [openReviews, setOpenReviews] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await getGuides();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchGuides();
  }, []);

  const handleExplorePlaces = (guideId?: number) => {
    if (guideId) {
      navigate(`/tourist/places/${guideId}`);
    }
  };

  const handleOpenModal = (guideId: number) => {
    setSelectedGuideId(guideId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setFeedback("");
  };

  const handleOpenReviews = async (guide: Guide) => {
    setSelectedGuide(guide);
    try {
      const data = await getReviewsByGuideId(guide.userId!);
      setReviews(data);
    } catch (err) {
      console.error("Error loading reviews:", err);
      setReviews([]);
    }
    setOpenReviews(true);
  };

  const handleCloseReviews = () => {
    setOpenReviews(false);
    setSelectedGuide(null);
    setReviews([]);
  };
  const handleSubmit = async () => {
    try {
      await createReview({
        ratings: rating!,
        feedback,
        guideId: selectedGuideId!,
        touristId: Number(localStorage.getItem("Id")), // Assuming tourist ID is stored in localStorage
      });
      toast.success("review added");
      handleClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
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
            }}
          >
            Explore Local Guides
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
            Discover experienced local guides, view their profiles, and book the
            perfect companion for your journey through amazing destinations.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {guides.map((guide, index) => (
            <Grid item xs={12} sm={6} md={4} key={guide.userId}>
              <Fade in timeout={400 + index * 100}>
                <Card
                  onMouseEnter={() => setHoveredCard(guide.userId!)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    transform:
                      hoveredCard === guide.userId
                        ? "translateY(-8px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredCard === guide.userId
                        ? "0 12px 24px rgba(0,0,0,0.15)"
                        : "0 6px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <Box sx={{ textAlign: "center", pt: 4 }}>
                    <Avatar
                      src={guide.profile}
                      alt={guide.fullName}
                      sx={{ width: 90, height: 90, mx: "auto" }}
                    />
                  </Box>

                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700}>
                      {guide.fullName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 1 }}
                    >
                      {guide.experience}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <LocationOn fontSize="small" /> {guide.location}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      <Phone fontSize="small" /> {guide.phoneNumber}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<TravelExplore />}
                      sx={{ mb: 2 }}
                      onClick={() => handleExplorePlaces(guide.userId)}
                    >
                      Explore Places
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<StarBorder />}
                      onClick={() => handleOpenModal(guide.userId!)}
                    >
                      Rate this guide
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenReviews(guide)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        mt:3,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                    >
                      View Reviews
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {guides.length === 0 && (
          <Paper
            sx={{
              textAlign: "center",
              py: 8,
              borderRadius: 4,
              border: "2px dashed #e2e8f0",
              mt: 4,
            }}
          >
            <Explore sx={{ fontSize: 80, color: "#cbd5e1", mb: 3 }} />
            <Typography variant="h5" fontWeight={600}>
              No guides available
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Check back later for amazing local guides in your area
            </Typography>
          </Paper>
        )}

        {/* Rating Modal */}
        {/* Enhanced Rating Modal */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
            },
          }}
        >
          {/* Header with gradient background */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              p: 3,
              textAlign: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23stars)"/></svg>\')',
                opacity: 0.3,
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Rate Your Experience
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  fontSize: "1.1rem",
                }}
              >
                Help others discover amazing guides
              </Typography>
            </Box>
          </Box>

          <DialogContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Rating Section */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  How was your experience?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    p: 2,
                    backgroundColor: "#f8fafc",
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Rating
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                    size="large"
                    sx={{
                      fontSize: "3rem",
                      "& .MuiRating-iconEmpty": {
                        color: "#e2e8f0",
                      },
                      "& .MuiRating-iconFilled": {
                        color: "#fbbf24",
                      },
                      "& .MuiRating-iconHover": {
                        color: "#f59e0b",
                      },
                    }}
                  />
                </Box>
                {rating && (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      backgroundColor:
                        rating >= 4
                          ? "#dcfce7"
                          : rating >= 3
                          ? "#fef3c7"
                          : "#fee2e2",
                      color:
                        rating >= 4
                          ? "#166534"
                          : rating >= 3
                          ? "#92400e"
                          : "#dc2626",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {rating >= 4 && "⭐ Excellent!"}
                    {rating === 3 && "👍 Good"}
                    {rating <= 2 && "👎 Needs Improvement"}
                  </Box>
                )}
              </Box>

              {/* Feedback Section */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: "#374151",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  💬 Share your thoughts
                </Typography>
                <TextField
                  label="Tell us about your experience..."
                  multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="What made this guide special? Any suggestions for improvement?"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      "& fieldset": {
                        borderColor: "#e2e8f0",
                        borderWidth: 2,
                      },
                      "&:hover fieldset": {
                        borderColor: "#3b82f6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3b82f6",
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#64748b",
                      fontWeight: 500,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                    mt: 1,
                    display: "block",
                    fontStyle: "italic",
                  }}
                >
                  Your feedback helps improve the guide experience for everyone
                </Typography>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              p: 3,
              backgroundColor: "#f8fafc",
              gap: 2,
            }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#e2e8f0",
                color: "#64748b",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  backgroundColor: "#f1f5f9",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              size="large"
              disabled={!rating}
              sx={{
                background: rating
                  ? "linear-gradient(135deg, #3b82f6, #8b5cf6)"
                  : "#cbd5e1",
                "&:hover": {
                  background: rating
                    ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                    : "#cbd5e1",
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                },
                borderRadius: 3,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
                boxShadow: rating
                  ? "0 4px 14px rgba(59, 130, 246, 0.2)"
                  : "none",
              }}
            >
              Submit Rating ⭐
            </Button>
          </DialogActions>
        </Dialog>
        <GuideReviewsModal
          open={openReviews}
          onClose={handleCloseReviews}
          guide={selectedGuide}
          reviews={reviews}
        />
      </Box>
    </Box>
  );
};

export default ExploreGuides;
