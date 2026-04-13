import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface Review {
  _id: string;
  userName: string;
  userAvatar?: string;
  reviewType: "College" | "Organization";
  collegeId?: string;
  collegeName?: string;
  reviewDate: string;
  content: string;
  status: "Pending" | "Approved" | "Rejected";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewMetaData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ReviewsResponse {
  success: boolean;
  data: {
    reviews: Review[];
    pagination: ReviewMetaData;
  };
  message: string;
}

const fetchReviews = async (page: number = 1, limit: number = 3) => {
  const response = await axios.get<ReviewsResponse>(`${API_URL}/reviews`, {
    params: { page, limit },
  });

  return response.data;
};

export const useReviews = (page: number = 1, limit: number = 3) => {
  return useQuery({
    queryKey: ["reviews", page, limit],
    queryFn: () => fetchReviews(page, limit),
  });
};
