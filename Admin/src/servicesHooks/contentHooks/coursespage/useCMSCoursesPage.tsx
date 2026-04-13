import api from "@/src/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateCMSCoursesPageRequest = async (payload: any) => {
    const { data } = await api.patch("/cms/coursespage", payload);
    return data;
};

export const useUpdateCMSCoursesPage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateCMSCoursesPageRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cms/coursespage"] });
        },
        onError: (error: any) => {
            console.error("Error updating cms courses page:", error?.response?.data || error.message);
        },
    });

    return {
        updateCMSCoursesPage: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
