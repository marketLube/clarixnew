export interface Recruiter {
    _id: string;
    companyName: string;
    jobTitle: string;
    hiringDuration: string;
    industry?: string;
    logo?: string;
    createdAt: string;
    updatedAt: string;
}

export interface RecruiterFormData {
    companyName: string;
    jobTitle: string;
    hiringDuration: string;
    industry?: string;
    logo?: File;
}

export interface RecruiterPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface RecruiterResponse {
    success: boolean;
    data: {
        recruiters: Recruiter[];
        pagination: RecruiterPagination;
    };
}

export interface UseRecruitersParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'companyName' | 'jobTitle' | 'createdAt' | 'updatedAt';
    order?: 'asc' | 'desc';
}

