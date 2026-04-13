import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";


const addCollegeRequest = async (formData: FormData) => {
  const { data } = await api.post("/college", formData);
  return data;
};

export const useAddCollege = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addCollegeRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colleges"] });
    },
  });

  return {
    addCollege: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
