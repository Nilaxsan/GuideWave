import axios from "axios";
import { HOST_URL } from "./api";

export interface Booking {
  bookingId?: number;   // optional for create
  touristId: number;
  guideId: number;
  placeId: number;
  bookingDate: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

// Get all bookings
export const getBookings = async () => {
  const response = await axios.get(`${HOST_URL}/Booking`);
  return response.data;
};

// Get booking by id
export const getBookingById = async (id: number) => {
  const response = await axios.get(`${HOST_URL}/Booking/${id}`);
  return response.data;
};

// Get bookings by tourist
export const getBookingsByTourist = async (touristId: number) => {
  const response = await axios.get(`${HOST_URL}/Booking/tourist/${touristId}`);
  return response.data;
};

// Get bookings by guide
export const getBookingsByGuide = async (guideId: number) => {
  const response = await axios.get(`${HOST_URL}/Booking/guide/${guideId}`);
  return response.data;
};

// Create new booking
export const createBooking = async (data: Booking) => {
  const response = await axios.post(`${HOST_URL}/Booking`, data);
  return response.data;
};

// Update booking
export const updateBooking = async (id: number, data: Booking) => {
  const response = await axios.put(`${HOST_URL}/Booking/${id}`, data);
  return response.data;
};

// Delete booking
export const deleteBooking = async (id: number) => {
  const response = await axios.delete(`${HOST_URL}/Booking/${id}`);
  return response.data;
};
