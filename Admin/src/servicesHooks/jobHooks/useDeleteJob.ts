import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteJobRequest = async (id: string) => {
  const { data } = await api.delete(`/job/${id}`);
  return data;
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteJobRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    deleteJob: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

