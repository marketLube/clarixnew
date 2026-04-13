export interface Scholarship {
    _id: string;
    scholarshipName: string;
    scholarshipType: 'Merit Based' | 'Need Based' | 'Government' | 'Private' | 'Sports' | 'Minority' | 'International';
    fundingType: 'Full Funding' | 'Partial Funding' | 'Tuition Waiver' | 'Stipend' | 'One-Time Grant';
    deadline: string;
    totalFundingAmount: number;
    description: string;
    officialWebsite: string;
    isActive: boolean;
    status: 'active' | 'closed' | 'upcoming';
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ScholarshipResponseData {
    scholarships: Scholarship[];
    pagination: Pagination;
}

export interface ScholarshipResponse {
    success: boolean;
    data: ScholarshipResponseData;
    message: string;
}

export interface UseScholarshipsParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    type?: string;
    fundingType?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

