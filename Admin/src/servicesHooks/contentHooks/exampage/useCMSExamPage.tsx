import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSExamPageRequest = async (payload: any) => {
    const { data } = await api.patch("/cms/exampage", payload);
    return data;
};

export const useUpdateCMSExamPage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateCMSExamPageRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cms/exampage"] });
        },
        onError: (error: any) => {
            console.error("Error updating cms exam page:", error?.response?.data || error.message);
        },
    });

    return {
        updateCMSExamPage: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
