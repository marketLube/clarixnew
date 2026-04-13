import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const updateCourseRequest = async ({ id, formData }: { id: string; formData: FormData }) => {
  const { data } = await api.patch(`/course/${id}`, formData);
  return data;
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCourseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return {
    updateCourse: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

