import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteBlogRequest = async (id: string,) => {
    const { data } = await api.delete(`/blog/${id}`);
    return data;
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteBlogRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (error: any) => {
            console.error("Error creating blog:", error?.response?.data || error.message);
        },
    });

    return {
        deleteBlog: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
