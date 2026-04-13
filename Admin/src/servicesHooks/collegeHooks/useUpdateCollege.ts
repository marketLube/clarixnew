import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const updateCollegeRequest = async ({ id, formData }: { id: string; formData: FormData }) => {
  const { data } = await api.patch(`/college/${id}`, formData);
  return data;
};

export const useUpdateCollege = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCollegeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });

  return {
    updateCollege: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

