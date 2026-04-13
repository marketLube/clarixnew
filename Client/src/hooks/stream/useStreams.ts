import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Stream {
  _id: string;
  name: string;
  image: string;
  enabled: boolean;
  collegesCount: number;
  examsCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface StreamResponseData {
  streams: Stream[];
}

interface StreamResponse {
  success: boolean;
  data: StreamResponseData;
  message: string;
}

const fetchStreams = async (): Promise<StreamResponse> => {
  const response = await api.get<StreamResponse>("/stream", {
    params: {
      enabled: true,
      sortBy: "createdAt",
      order: "desc",
    },
  });

  return response.data;
};

export const useStreams = () => {
  return useQuery({
    queryKey: ["streams"],
    queryFn: fetchStreams,
    staleTime: 5 * 60 * 1000,
  });
};
