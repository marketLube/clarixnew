import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const updateStreamRequest = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const { data } = await api.patch(`/stream/${id}`, formData);
  return data;
};

export const useUpdateStream = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateStreamRequest,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["streams"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ["stream", variables.id] });
      }
    },
  });

  return {
    updateStream: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};


