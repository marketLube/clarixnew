
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { message } from 'antd';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const createReview = async (formData: FormData) => {
    const response = await axios.post(`${API_URL}/reviews`, formData, {
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
