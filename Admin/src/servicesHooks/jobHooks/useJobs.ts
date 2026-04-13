import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { JobResponse, UseJobsParams } from './types/jobHooksType';

const fetchJobs = async (params: UseJobsParams = {}): Promise<JobResponse> => {
    const { data } = await api.get<JobResponse>('/job', { params });
    return data;
};

export const useJobs = (overrides: UseJobsParams = {}) => {
    const defaultParams: UseJobsParams = {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc',
    };

    const params: UseJobsParams = {
        ...defaultParams,
        ...overrides,
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['jobs', params],
        queryFn: () => fetchJobs(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        placeholderData: (previousData) => previousData,
    });

    return {
        data,
        isLoading,
        isFetching,
        error,
        refetch
    };
};

