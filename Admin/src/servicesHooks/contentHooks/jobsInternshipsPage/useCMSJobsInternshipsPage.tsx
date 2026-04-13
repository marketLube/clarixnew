import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSJobsInternshipsPageRequest = async (payload: any) => {
    const { data } = await api.patch("/cms/jobsinternshipspage", payload);
    return data;
};

export const useUpdateCMSJobsInternshipsPage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateCMSJobsInternshipsPageRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cms/jobsinternshipspage"] });
        },
        onError: (error: any) => {
            console.error("Error updating cms jobs & internships page:", error?.response?.data || error.message);
        },
    });

    return {
        updateCMSJobsInternshipsPage: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
