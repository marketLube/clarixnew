import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteRecruiterRequest = async (id: string) => {
  const { data } = await api.delete(`/recruiter/${id}`);
  return data;
};

export const useDeleteRecruiter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRecruiterRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
    },
  });

  return {
    deleteRecruiter: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
