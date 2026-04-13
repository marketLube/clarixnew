import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { RecruiterResponse, UseRecruitersParams } from './types/recruiterHooksType';

const fetchRecruiters = async (params: UseRecruitersParams = {}): Promise<RecruiterResponse> => {
    const { data } = await api.get<RecruiterResponse>('/recruiter', { params });
    return data;
};

export const useRecruiters = (params: UseRecruitersParams = {}) => {
    const { data, isLoading, isFetching, error, refetch } = useQuery({
        queryKey: ['recruiters', params],
        queryFn: () => fetchRecruiters(params),
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: (previousData) => previousData,
    });

    return { data, isLoading, isFetching, error, refetch };
};

