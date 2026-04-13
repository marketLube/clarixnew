import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { UpdateExamPayload } from "./types/examHooksType";

interface UpdateExamParams {
  id: string;
  data: UpdateExamPayload | FormData;
}

const updateExamRequest = async ({ id, data }: UpdateExamParams) => {
  const response = await api.patch(`/exam/${id}`, data);
  return response.data;
};

export const useUpdateExam = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateExamRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  return {
    updateExam: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

