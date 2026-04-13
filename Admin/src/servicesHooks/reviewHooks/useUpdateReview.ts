
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { Review, UpdateReviewParams } from './types/reviewHooksType';
import { toast } from 'sonner';

const updateReview = async ({ id, data }: UpdateReviewParams) => {
    const response = await api.patch<{ success: boolean; data: Review; message: string }>(
        `/reviews/${id}`,
        data
    );
    return response.data;
};

export const useUpdateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateReview,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            toast.success('Review updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update review');
        },
    });
};
