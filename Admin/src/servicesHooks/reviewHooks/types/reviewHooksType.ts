
export interface Review {
    _id: string;
    userName: string;
    userAvatar?: string;
    reviewType: 'College' | 'Organization';
    collegeId?: string;
    collegeName?: string;
    reviewDate: string;
    content: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewMetaData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ReviewsResponse {
    success: boolean;
    data: {
        reviews: Review[];
        pagination: ReviewMetaData;
    };
    message: string;
}

export interface UseReviewsParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    reviewType?: string;
    collegeId?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export interface UpdateReviewParams {
    id: string;
    data: Partial<Review>;
}

export interface ReviewStats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}
