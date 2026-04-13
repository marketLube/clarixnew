
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { ReviewsResponse, UseReviewsParams } from './types/reviewHooksType';

const fetchReviews = async (params: UseReviewsParams = {}) => {
    const { data } = await api.get<ReviewsResponse>('/reviews', { params });
    return data;
};

export const useReviews = (params: UseReviewsParams = {}) => {
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['reviews', params],
        queryFn: () => fetchReviews(params),
        placeholderData: (previousData) => previousData,
    });

    return { data, isLoading, error, refetch, isFetching };
};
