import axios from "axios";
import { HOST_URL } from "./api";

export const forgotPassword = async (data: any) => {
  const response = await axios.post(`${HOST_URL}/Auth/forgot-password`, data);
  return response.data;
};

export const verifyOtp = async (data: any) => {
  const response = await axios.post(`${HOST_URL}/Auth/verify-otp`, data);
  return response.data;
};

export const resetPassword = async (data: any) => {
  const response = await axios.post(`${HOST_URL}/Auth/reset-password`, data);
  return response.data;
};




