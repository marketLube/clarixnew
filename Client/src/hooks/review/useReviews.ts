import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Review {
  _id: string;
  userName: string;
  userAvatar?: string;
  reviewType: "College" | "Organization";
  collegeId?: string;
  collegeName?: string;
  rating?: number;
  course?: string;
  city?: string;
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
  const response = await api.get<ReviewsResponse>("/reviews", {
    params: { page, limit },
  });

  return response.data;
};

export const useReviews = (page: number = 1, limit: number = 3) => {
  return useQuery({
    queryKey: ["reviews", { page, limit }],
    queryFn: () => fetchReviews(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};
