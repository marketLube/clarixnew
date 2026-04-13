import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteStreamRequest = async (id: string) => {
  const { data } = await api.delete(`/stream/${id}`);
  return data;
};

export const useDeleteStream = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteStreamRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streams"] });
    },
  });

  return {
    deleteStream: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
