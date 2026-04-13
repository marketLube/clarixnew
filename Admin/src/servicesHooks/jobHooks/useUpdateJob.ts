import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { UpdateJobPayload } from './types/jobHooksType';

const updateJobRequest = async ({ id, payload }: { id: string; payload: UpdateJobPayload }) => {
    const { data } = await api.patch(`/job/${id}`, payload);
    return data;
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateJobRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
    });

    return {
        updateJob: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
    };
};

