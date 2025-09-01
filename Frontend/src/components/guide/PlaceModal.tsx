import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, Controller, useWatch } from "react-hook-form";
import { createPlace, updatePlace, Place } from "../../services/place";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
  place: Place | null;
  guideId: number;
  onSuccess: () => void;
}

// Days of week options
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PlaceModal: React.FC<Props> = ({ open, onClose, place, guideId, onSuccess }) => {
  const { register, handleSubmit, setValue, control, reset } = useForm<Place>({
    defaultValues: {
      placeName: "",
      description: "",
      imageUrl: "",
      availability: [],
      guideId,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Watch the current imageUrl value (for preview)
  const watchImageUrl = useWatch({ control, name: "imageUrl" });

  // Reset form values whenever editing a place
  useEffect(() => {
    if (place) {
      reset({
        placeName: place.placeName,
        description: place.description,
        imageUrl: place.imageUrl,
        availability: place.availability || [],
        guideId: place.guideId,
        placeId: place.placeId,
      });
    } else {
      reset({
        placeName: "",
        description: "",
        imageUrl: "",
        availability: [],
        guideId,
      });
    }
  }, [place, reset, guideId]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "GuideWave");
    formData.append("cloud_name", "dpe26xwu8");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dpe26xwu8/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setValue("imageUrl", data.url);
      toast.success("Image uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const onSubmit = async (data: Place) => {
    setIsLoading(true);
    try {
      if (place) {
        // Update existing
        await updatePlace(place.placeId!, { ...data, guideId });
        toast.success("Place updated");
      } else {
        // Create new
        await createPlace({ ...data, guideId });
        toast.success("Place created");
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 10, top: 10 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" mb={2}>
          {place ? "Edit Place" : "Create Place"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Place Name"
            fullWidth
            {...register("placeName", { required: true })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            {...register("description")}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Availability</InputLabel>
            <Controller
              name="availability"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  value={field.value || []}
                  onChange={(e) => field.onChange(e.target.value)}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      <Checkbox checked={field.value?.includes(day)} />
                      <ListItemText primary={day} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <Button
            component="label"
            variant="contained"
            fullWidth
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            Upload Image
            <input type="file" hidden onChange={handleUpload} />
          </Button>

          {/* Image Preview */}
          {watchImageUrl && (
            <Box
              sx={{
                border: "1px solid #555",
                borderRadius: "5px",
                position: "relative",
                width: "fit-content",
                mb: 2,
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  backgroundColor: "#ddd8",
                  width: 25,
                  height: 25,
                }}
                onClick={() => {
                  setValue("imageUrl", "");
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <img
                src={watchImageUrl}
                alt="place_img"
                style={{
                  width: 375,
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default PlaceModal;
