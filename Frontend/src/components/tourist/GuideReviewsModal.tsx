import React from "react";
import {
  Box,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Rating,
} from "@mui/material";
import { Guide } from "../../services/guideService";
import { Review } from "../../services/reviewService";


interface GuideReviewsModalProps {
  open: boolean;
  onClose: () => void;
  guide: Guide | null;
  reviews: Review[];
}

const GuideReviewsModal: React.FC<GuideReviewsModalProps> = ({
  open,
  onClose,
  guide,
  reviews,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, // medium size
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Reviews for {guide?.fullName}
          </Typography>

          {reviews.length > 0 ? (
            reviews.map((r) => (
              <Box
                key={r.reviewId}
                mb={2}
                p={2}
                border="1px solid #e2e8f0"
                borderRadius={2}
              >
                {/* ⭐ rating stars */}
                <Rating value={r.ratings} readOnly precision={0.5} />
                <Typography color="text.secondary" mt={1}>
                  {r.feedback}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={1}
                >
                  {new Date(r.timestamp).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              No reviews yet for this guide.
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default GuideReviewsModal;
