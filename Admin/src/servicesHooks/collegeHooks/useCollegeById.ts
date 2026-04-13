import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

const fetchCollegeById = async (id: string) => {
    const { data } = await api.get(`/college/${id}`);
    return data;
};

export const useCollegeById = (id: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['college', id],
        queryFn: () => fetchCollegeById(id),
        enabled: !!id,
    });

    return { data, isLoading, error, refetch };
};

