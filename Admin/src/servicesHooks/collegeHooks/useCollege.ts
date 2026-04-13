import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { CollegesResponse, UseCollegesParams } from './types/collegeHooksType';
import { useAppSelector } from '@/src/store/hooks';


const fetchColleges = async (params: UseCollegesParams = {}) => {
    const { data } = await api.get<CollegesResponse>('/college', { params });
    return data;
};

export const useColleges = (overrides: UseCollegesParams = {}) => {
    const { currentType, searchQuery, page, limit } = useAppSelector((state) => state.college);

    const params: UseCollegesParams = {
        page,
        limit,
        ...(searchQuery && { search: searchQuery }),
        ...(currentType !== 'all' && { type: currentType }),
        ...overrides,
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['colleges', params],
        queryFn: () => fetchColleges(params),
        placeholderData: (previousData) => previousData,
    });

    return { data, isLoading, error, refetch };
};
