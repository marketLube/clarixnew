import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const deleteCourseRequest = async (id: string) => {
  const { data } = await api.delete(`/course/${id}`);
  return data;
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteCourseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return {
    deleteCourse: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
