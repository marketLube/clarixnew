import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteExamRequest = async (id: string) => {
  const { data } = await api.delete(`/exam/${id}`);
  return data;
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteExamRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  return {
    deleteExam: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

