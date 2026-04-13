import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

export interface University {
    _id: string;
    name: string;
    shortName?: string;
    type: 'Public' | 'Private' | 'State' | 'Central' | 'Deemed';
    state: string;
    city: string;
    establishedYear: number;
    logo?: string;
    website?: string;
    email?: string;
    phone?: string;
    description?: string;
    accreditation?: string[];
    affiliatedColleges?: number;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface UniversityResponseData {
    universities: University[];
    pagination: Pagination;
}

interface UniversityResponse {
    success: boolean;
    data: UniversityResponseData;
    message: string;
}

export interface UseUniversitiesParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    enabled?: boolean;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

const fetchUniversities = async (params: UseUniversitiesParams = {}): Promise<UniversityResponse> => {
    const { data } = await api.get<UniversityResponse>('/university', { params });
    return data;
};

export const useUniversities = (overrides: UseUniversitiesParams = {}) => {
    const defaultParams: UseUniversitiesParams = {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc',
    };

    const params: UseUniversitiesParams = {
        ...defaultParams,
        ...overrides,
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['universities', params],
        queryFn: () => fetchUniversities(params),
        staleTime: 5 * 60 * 1000,
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

