import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { Job } from "./types/jobHooksType";

interface JobByIdResponse {
  success: boolean;
  data: Job;
  message: string;
}

const fetchJobById = async (id: string): Promise<JobByIdResponse> => {
  const { data } = await api.get<JobByIdResponse>(`/job/${id}`);
  return data;
};

export const useJobById = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });
};


