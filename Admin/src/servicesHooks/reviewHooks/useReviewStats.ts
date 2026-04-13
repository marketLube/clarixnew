
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { ReviewStats } from './types/reviewHooksType';

const fetchReviewStats = async () => {
    const { data } = await api.get<{ success: boolean; data: ReviewStats; message: string }>('/reviews/stats');
    return data;
};

export const useReviewStats = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['reviewStats'],
        queryFn: fetchReviewStats,
    });

    return { data, isLoading, error };
};
