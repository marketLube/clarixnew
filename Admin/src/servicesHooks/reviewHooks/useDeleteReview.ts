
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { toast } from 'sonner';

const deleteReview = async (id: string) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
};

export const useDeleteReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            toast.success('Review deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete review');
        },
    });
};
