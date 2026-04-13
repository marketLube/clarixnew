import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

interface Stream {
    _id: string;
    name: string;
    image: string;
    enabled: boolean;
    collegesCount: number;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface StreamResponseData {
    streams: Stream[];
    pagination: Pagination;
}

interface StreamResponse {
    success: boolean;
    data: StreamResponseData;
    message: string;
}

interface UseStreamsParams {
    page?: number;
    limit?: number;
    search?: string;
    enabled?: boolean;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

const fetchStreams = async (params: UseStreamsParams = {}): Promise<StreamResponse> => {
    const { data } = await api.get<StreamResponse>('/stream', { params });
    return data;
};

export const useStreams = (overrides: UseStreamsParams = {}) => {
    const defaultParams: UseStreamsParams = {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc',
    };

    const params: UseStreamsParams = {
        ...defaultParams,
        ...overrides,
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['streams', params],
        queryFn: () => fetchStreams(params),
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

export type { Stream, StreamResponse, UseStreamsParams };
