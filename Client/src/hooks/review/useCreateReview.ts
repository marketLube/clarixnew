
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { message } from 'antd';

const createReview = async (formData: FormData) => {
    const response = await api.post('/reviews', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const useCreateReview = () => {
    return useMutation({
        mutationFn: createReview,
        onSuccess: () => {
            message.success('Review submitted successfully!');
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || 'Failed to submit review');
        },
    });
};
