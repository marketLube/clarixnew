import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateBlogRequest = async ({ id, formData }: { id: string; formData: FormData }) => {
    const { data } = await api.patch(`/blog/${id}`, formData);
    return data;
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateBlogRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (error: any) => {
            console.error("Error updating blog:", error?.response?.data || error.message);
        },
    });

    return {
        updateBlog: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
