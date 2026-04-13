import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { ExamResponse, UseExamsParams } from './types/examHooksType';

const fetchExams = async (params: UseExamsParams = {}): Promise<ExamResponse> => {
    const { data } = await api.get<ExamResponse>('/exam', { params });
    return data;
};

export const useExams = (overrides: UseExamsParams = {}) => {
    const defaultParams: UseExamsParams = {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc',
    };

    const params: UseExamsParams = {
        ...defaultParams,
        ...overrides,
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['exams', params],
        queryFn: () => fetchExams(params),
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

