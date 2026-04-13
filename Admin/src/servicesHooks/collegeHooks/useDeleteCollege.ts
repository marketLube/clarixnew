import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteCollegeRequest = async (id: string) => {
  const { data } = await api.delete(`/college/${id}`);
  return data;
};

export const useDeleteCollege = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCollegeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });

  return {
    deleteCollege: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
