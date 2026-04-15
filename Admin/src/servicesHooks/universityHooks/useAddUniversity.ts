import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { UniversityFormData } from "./types/universityHooksType";

const addUniversityRequest = async (universityData: UniversityFormData) => {
    const { data } = await api.post("/university", universityData);
    return data;
};

export const useAddUniversity = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addUniversityRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["universities"] });
        },
        onError: () => {
            // Error handled silently
        },
    });

    return {
        addUniversity: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    };
};

