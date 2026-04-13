import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSHomePageRequest = async (formData: FormData) => {
    const { data } = await api.patch("/cms/homepage", formData);
    return data;
};

export const useUpdateCMSHomePage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateCMSHomePageRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cms/homepage"] });
        },
        onError: (error: any) => {
            console.error("Error updating cms homepage:", error?.response?.data || error.message);
        },
    });

    return {
        updateCMSHomePage: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
