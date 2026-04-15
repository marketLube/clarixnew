import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSBlogPageRequest = async (formData: FormData) => {
    const { data } = await api.patch("/cms/blogpage", formData);
    return data;
};

export const useUpdateCMSBlogPage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateCMSBlogPageRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cms/blogpage"] });
        },
        onError: () => {
            // Error handled silently
        },
    });

    return {
        updateCMSBlogPage: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
