import axios from "axios";
import { HOST_URL } from "./api";

export interface Guide {
  userId?: number; // optional for create
  fullName: string;
  email: string;
  password?: string; // only for create/login
  phoneNumber: string;
  experience: string;
  location: string;
  profile: string; // URL to profile image
}




// Get all guides
export const getGuides = async () => {
  const response = await axios.get(`${HOST_URL}/Guide`);
  return response.data;
};

// Get guide by id
export const getGuideById = async (id: number) => {
  const response = await axios.get(`${HOST_URL}/Guide/${id}`);
  return response.data;
};

// Create a new guide (registration)
export const createGuide = async (data: Omit<Guide, "userId">) => {
  const response = await axios.post(`${HOST_URL}/Guide`, data);
  return response.data;
};

// Verify email
export const verifyEmail = async (token: string, email: string) => {
  const response = await axios.get(
    `${HOST_URL}/Guide/verify-email?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}`
  );
  return response.data;
};

// Login guide
export const loginGuide = async (email: string, password: string) => {
  const response = await axios.post(`${HOST_URL}/Guide/login`, {
    email,
    password,
  });
  return response.data; // contains JWT token
};

// Update guide
export const updateGuide = async (id: number, data: Guide) => {
  const response = await axios.put(`${HOST_URL}/Guide/${id}`, data);
  return response.data;
};

// Delete guide
export const deleteGuide = async (id: number) => {
  const response = await axios.delete(`${HOST_URL}/Guide/${id}`);
  return response.data;
};
