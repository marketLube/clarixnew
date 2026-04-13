import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSFooterRequest = async (payload: any) => {
  const { data } = await api.patch("/cms/footer", payload);
  return data;
};

export const useUpdateCMSFooter = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCMSFooterRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms/footer"] });
    },
    onError: (error: any) => {
      console.error("Error updating cms footer:", error?.response?.data || error.message);
    },
  });

  return {
    updateCMSFooter: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
