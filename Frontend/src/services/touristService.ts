import axios from "axios";
import { HOST_URL } from "./api";
import { CreateTouristsDto, LoginDto, TouristsDto } from "../components/data/Tourist";

const API_URL = `${HOST_URL}/Tourists`;


// 🔹 Get all tourists
export const getAllTourists = async (): Promise<TouristsDto[]> => {
  const response = await axios.get<TouristsDto[]>(API_URL);
  return response.data;
};

// 🔹 Get tourist by ID
export const getTouristById = async (id: number): Promise<TouristsDto> => {
  const response = await axios.get<TouristsDto>(`${API_URL}/${id}`);
  return response.data;
};

// 🔹 Register new tourist
export const createTourist = async (
  tourist: CreateTouristsDto
): Promise<TouristsDto> => {
  const response = await axios.post<TouristsDto>(API_URL, tourist);
  return response.data;
};

// 🔹 Verify Email
export const verifyEmail = async (token: string, email: string) => {
  const response = await axios.get(`${API_URL}/verify-email`, {
    params: { token, email },
  });
  return response.data;
};

// 🔹 Login tourist
export const loginTourist = async (
  loginData: LoginDto
): Promise<{ Token: string }> => {
  const response = await axios.post<{ Token: string }>(
    `${API_URL}/login`,
    loginData
  );
  return response.data;
};

// 🔹 Update tourist
export const updateTourist = async (
  id: number,
  tourist: TouristsDto
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, tourist);
};

// 🔹 Delete tourist
export const deleteTourist = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
