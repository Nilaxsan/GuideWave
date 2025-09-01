import axios from "axios";
import { HOST_URL } from "./api";

// Types
export interface Review {
  reviewId: number;
  ratings: number;
  feedback: string;
  guideId: number;
  touristId: number;
  timestamp: string;
}

export interface CreateReviewDto {
  ratings: number;
  feedback: string;
  guideId: number;
  touristId: number;
}

// ✅ Get all reviews
export const getReviews = async (): Promise<Review[]> => {
  const response = await axios.get(`${HOST_URL}/Review`);
  return response.data;
};

// ✅ Get review by Id
export const getReviewById = async (id: number): Promise<Review> => {
  const response = await axios.get(`${HOST_URL}/Review/${id}`);
  return response.data;
};

// ✅ Create a review
export const createReview = async (review: CreateReviewDto): Promise<Review> => {
  const response = await axios.post(`${HOST_URL}/Review`, review);
  return response.data;
};

// ✅ Get reviews for a specific guide
export const getReviewsByGuideId = async (guideId: number): Promise<Review[]> => {
  const response = await axios.get(`${HOST_URL}/Review/ByGuide/${guideId}`);
  return response.data;
};

// ✅ Update a review
export const updateReview = async (
  id: number,
  review: Review
): Promise<void> => {
  await axios.put(`${HOST_URL}/Review/${id}`, review);
};

// ✅ Delete a review
export const deleteReview = async (id: number): Promise<void> => {
  await axios.delete(`${HOST_URL}/Review/${id}`);
};
