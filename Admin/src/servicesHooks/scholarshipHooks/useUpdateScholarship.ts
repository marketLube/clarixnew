import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export interface UpdateScholarshipPayload {
  scholarshipName?: string;
  scholarshipType?: string;
  fundingType?: string;
  deadline?: string;
  totalFundingAmount?: number;
  description?: string;
  officialWebsite?: string;
  isActive?: boolean;
  status?: string;
}

interface UpdateScholarshipParams {
  id: string;
  data: UpdateScholarshipPayload;
}

const updateScholarshipRequest = async ({ id, data }: UpdateScholarshipParams) => {
  const response = await api.patch(`/scholarship/${id}`, data);
  return response.data;
};

export const useUpdateScholarship = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateScholarshipRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });

  return {
    updateScholarship: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

