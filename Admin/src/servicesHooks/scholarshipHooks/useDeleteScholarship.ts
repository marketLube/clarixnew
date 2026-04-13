import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteScholarshipRequest = async (id: string) => {
  const { data } = await api.delete(`/scholarship/${id}`);
  return data;
};

export const useDeleteScholarship = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteScholarshipRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scholarships"] });
    },
  });

  return {
    deleteScholarship: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

