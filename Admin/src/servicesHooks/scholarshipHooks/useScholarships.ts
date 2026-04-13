import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { ScholarshipResponse, UseScholarshipsParams } from './types/scholarshipHooksType';

const fetchScholarships = async (params: UseScholarshipsParams = {}): Promise<ScholarshipResponse> => {
    const { data } = await api.get<ScholarshipResponse>('/scholarship', { params });
    return data;
};


export const useScholarships = (overrides: UseScholarshipsParams = {}) => {
    const defaultParams: UseScholarshipsParams = {
        page: 1,
        limit: 100, // Get all scholarships for the dropdown
        sortBy: 'createdAt',
        order: 'desc',
        status: 'active', // Only fetch active scholarships
    };

    const params: UseScholarshipsParams = {
        ...defaultParams,
        ...overrides,
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['scholarships', params],
        queryFn: () => fetchScholarships(params),
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

