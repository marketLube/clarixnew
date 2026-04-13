import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const updateRecruiterRequest = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await api.patch(`/recruiter/${id}`, formData);
  return data;
};

export const useUpdateRecruiter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateRecruiterRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recruiters"] });
    },
  });

  return {
    updateRecruiter: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};


