import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createBlogRequest = async (formData: FormData) => {
    const { data } = await api.post("/blog", formData);
    return data;
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBlogRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (error: any) => {
            console.error("Error creating blog:", error?.response?.data || error.message);
        },
    });

    return {
        createBlog: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
