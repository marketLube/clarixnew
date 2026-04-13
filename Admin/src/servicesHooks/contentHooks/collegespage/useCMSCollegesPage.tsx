import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSCollegesPageRequest = async (payload: any) => {
    const { data } = await api.patch("/cms/collegespage", payload);
    return data;
};

export const useUpdateCMSCollegesPage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateCMSCollegesPageRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cms/collegespage"] });
        },
        onError: (error: any) => {
            console.error("Error updating cms colleges page:", error?.response?.data || error.message);
        },
    });

    return {
        updateCMSCollegesPage: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
