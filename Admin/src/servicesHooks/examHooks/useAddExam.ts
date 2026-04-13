import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { CreateExamPayload } from "./types/examHooksType";

const addExamRequest = async (examData: CreateExamPayload | FormData) => {
  const { data } = await api.post("/exam", examData);
  return data;
};

export const useAddExam = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addExamRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  return {
    addExam: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

