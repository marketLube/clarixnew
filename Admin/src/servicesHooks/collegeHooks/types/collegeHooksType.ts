export interface College {
    _id: string;
    collegeName: string;
    location: string;
    type: string;
    // Add other relevant fields as needed
    createdAt?: string;
    updatedAt?: string;
}

export interface MetaData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface CollegesResponse {
    success: boolean;
    data: {
        colleges: College[];
        pagination: MetaData;
        matrix: any;
    };
    message: string;
}

export interface UseCollegesParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    location?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}
