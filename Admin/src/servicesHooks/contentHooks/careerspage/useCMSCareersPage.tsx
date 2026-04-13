import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSCareersPageRequest = async (payload: any) => {
  const { data } = await api.patch("/cms/careerpage", payload);
  return data;
};

export const useUpdateCMSCareersPage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCMSCareersPageRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms/careerpage"] });
    },
    onError: (error: any) => {
      console.error("Error updating cms careers page:", error?.response?.data || error.message);
    },
  });

  return {
    updateCMSCareersPage: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
