import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export interface CreateScholarshipPayload {
  scholarshipName: string;
  scholarshipType: string;
  fundingType: string;
  deadline: string;
  totalFundingAmount: number;
  description: string;
  officialWebsite: string;
  status?: string;
}

const addScholarshipRequest = async (scholarshipData: CreateScholarshipPayload) => {
  const { data } = await api.post("/scholarship", scholarshipData);
  return data;
};

export const useAddScholarship = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addScholarshipRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });

  return {
    addScholarship: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

