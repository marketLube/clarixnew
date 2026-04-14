
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface Exam {
    _id: string;
    shortName: string;
    fullName: string;
    registrationDate: string;
    examDate: string;
    resultPublishDate: string;
    qualificationRequired: string[];
    collegesAccepting: number;
    officialWebsite: string;
    description: string;
    isActive: boolean;
    logo: string;
}

interface ExamsResponse {
    success: boolean;
    data: {
        exams: Exam[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    message: string;
}

const fetchExams = async (params: { page?: number; limit?: number; stream?: string; search?: string } = {}) => {
    const { page = 1, limit = 8, ...rest } = params;
    const response = await api.get<ExamsResponse>("/exam", {
        params: { page, limit, ...rest },
    });
    return response.data;
};

export const useExams = (page: number = 1, limit: number = 8, stream?: string, search?: string) => {
    return useQuery({
        queryKey: ['exams', page, limit, stream, search],
        queryFn: () => fetchExams({ page, limit, stream, search }),
        staleTime: 5 * 60 * 1000,
    });
};
