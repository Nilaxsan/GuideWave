import axios from "axios";
import { HOST_URL } from "./api";

export interface Place {
  placeId?: number; // optional for create
  placeName: string;
  description: string;
  imageUrl: string;
  availability: string[]; 
  guideId: number;
}

// Get all places
export const getPlaces = async () => {
  const response = await axios.get(`${HOST_URL}/Place`);
  return response.data;
};

// Get place by id
export const getPlaceById = async (id: number) => {
  const response = await axios.get(`${HOST_URL}/Place/${id}`);
  return response.data;
};
//Getplace bu guideId
export const getPlaceByGuideId = async (guideId: number) => {
  const response = await axios.get(`${HOST_URL}/Place/guide/${guideId}`);
  return response.data;
};
// Create new place
export const createPlace = async (data: Place) => {
  const response = await axios.post(`${HOST_URL}/Place`, data);
  return response.data;
};

// Update place
export const updatePlace = async (id: number, data: Place) => {
  const response = await axios.put(`${HOST_URL}/Place/${id}`, data);
  return response.data;
};

// Delete place
export const deletePlace = async (id: number) => {
  const response = await axios.delete(`${HOST_URL}/Place/${id}`);
  return response.data;
};
