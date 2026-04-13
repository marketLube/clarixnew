export interface University {
    _id: string;
    name: string;
    type: 'Public' | 'Private' | 'State' | 'Central' | 'Deemed';
    state: string;
    city: string;
    establishedYear: number;
    createdAt: string;
    updatedAt: string;
}

export interface UniversityFormData {
    name: string;
    type: 'Public' | 'Private' | 'State' | 'Central' | 'Deemed';
    state: string;
    city: string;
    establishedYear: number;
}

export interface UniversityPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface UniversityResponse {
    success: boolean;
    data: {
        universities: University[];
        pagination: UniversityPagination;
    };
}

export interface UseUniversitiesParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: 'Public' | 'Private' | 'State' | 'Central' | 'Deemed' | 'all';
    sortBy?: 'name' | 'establishedYear' | 'createdAt' | 'updatedAt';
    order?: 'asc' | 'desc';
}

