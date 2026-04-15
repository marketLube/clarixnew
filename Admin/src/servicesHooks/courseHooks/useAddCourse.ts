import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

const addCourseRequest = async (formData: FormData) => {
    const { data } = await api.post("/course", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const useAddCourse = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addCourseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
        onError: () => {
            // Error handled silently
        },
    });

    return {
        addCourse: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};
