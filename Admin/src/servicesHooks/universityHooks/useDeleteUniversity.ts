import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteUniversityRequest = async (id: string) => {
  const { data } = await api.delete(`/university/${id}`);
  return data;
};

export const useDeleteUniversity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUniversityRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
    },
  });

  return {
    deleteUniversity: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
