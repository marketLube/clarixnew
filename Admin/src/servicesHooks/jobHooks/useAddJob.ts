import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { CreateJobPayload } from './types/jobHooksType';

const addJobRequest = async (payload: CreateJobPayload) => {
    const { data } = await api.post('/job', payload);
    return data;
};

export const useAddJob = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addJobRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
    });

    return {
        addJob: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isSuccess: mutation.isSuccess,
    };
};

