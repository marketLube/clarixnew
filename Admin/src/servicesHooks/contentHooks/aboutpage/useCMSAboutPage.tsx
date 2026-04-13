import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSAboutPageRequest = async (payload: any) => {
  const { data } = await api.patch("/cms/aboutpage", payload);
  return data;
};

export const useUpdateCMSAboutPage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCMSAboutPageRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms/aboutpage"] });
    },
    onError: (error: any) => {
      console.error("Error updating cms about page:", error?.response?.data || error.message);
    },
  });

  return {
    updateCMSAboutPage: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
