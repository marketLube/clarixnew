import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const addRecruiterRequest = async (formData: FormData) => {
    const { data } = await api.post("/recruiter", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const useAddRecruiter = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addRecruiterRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recruiters"] });
        },
        onError: (error: any) => {
            console.error("Error adding recruiter:", error?.response?.data || error.message);
        },
    });

    return {
        addRecruiter: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

