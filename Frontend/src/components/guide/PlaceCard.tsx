import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

interface Place {
  placeId: number;
  guideId: number;
  placeName: string;
  description: string;
  location: string;
  imageUrl: string;
}

interface Props {
  place: Place;
  onEdit: () => void;
  onDelete: () => void;
}

const PlaceCard: React.FC<Props> = ({ place, onEdit, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia component="img" height="180" image={place.imageUrl} alt={place.placeName} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {place.placeName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {place.description}
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          📍 {place.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEdit}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceCard;
