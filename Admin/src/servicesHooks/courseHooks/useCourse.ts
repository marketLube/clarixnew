import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';
import { CourseResponse, UseCoursesParams } from './types/courseHooksType';

const fetchCourses = async (params: UseCoursesParams = {}): Promise<CourseResponse> => {
    const { data } = await api.get<CourseResponse>('/course', { params });
    return data;
};


export const useCourses = (overrides: UseCoursesParams = {}) => {
    const defaultParams: UseCoursesParams = {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        order: 'desc',
    };

    const params: UseCoursesParams = {
        ...defaultParams,
        ...overrides,
    };

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['courses', params],
        queryFn: () => fetchCourses(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
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
