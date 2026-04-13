import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const addStreamRequest = async (formData: FormData) => {
    const { data } = await api.post("/stream", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const useAddStream = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addStreamRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["streams"] });
        },
        onError: (error: any) => {
            console.error("Error adding stream:", error?.response?.data || error.message);
        },
    });

    return {
        addStream: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

