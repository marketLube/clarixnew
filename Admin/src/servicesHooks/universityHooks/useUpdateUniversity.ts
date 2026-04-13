import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { UniversityFormData } from "./types/universityHooksType";

const updateUniversityRequest = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<UniversityFormData>;
}) => {
  const { data: response } = await api.patch(`/university/${id}`, data);
  return response;
};

export const useUpdateUniversity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUniversityRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
    },
  });

  return {
    updateUniversity: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};


