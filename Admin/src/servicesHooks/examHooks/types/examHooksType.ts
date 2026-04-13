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
    stream?: any;
    createdAt: string;
    updatedAt: string;
}

export interface ExamPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ExamResponse {
    success: boolean;
    data: {
        exams: Exam[];
        pagination: ExamPagination;
    };
    message: string;
}

export interface UseExamsParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'active' | 'inactive';
    sortBy?: 'fullName' | 'shortName' | 'registrationDate' | 'examDate' | 'createdAt' | 'updatedAt';
    order?: 'asc' | 'desc';
}

export interface CreateExamPayload {
    shortName: string;
    fullName: string;
    registrationDate: string;
    examDate: string;
    resultPublishDate: string;
    qualificationRequired: string[];
    collegesAccepting: number;
    officialWebsite: string;
    description: string;
    stream?: any;
}

export interface UpdateExamPayload extends Partial<CreateExamPayload> {
    isActive?: boolean;
}

