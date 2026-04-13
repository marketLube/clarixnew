export interface Reason {
    title: string;
    description: string;
}

export interface Semester {
    title: string;
    topics: string;
}

export interface CareerOpportunity {
    title: string;
    description: string;
}

export interface Description {
    title: string;
    content: string;
    image: string;
}

export interface WhyChoose {
    title: string;
    description: string;
    reasons: Reason[];
}

export interface Syllabus {
    title: string;
    semesters: Semester[];
}

export interface CareerOpportunities {
    title: string;
    items: CareerOpportunity[];
}

export interface Stream {
    _id: string;
    name: string;
}

export interface Course {
    _id: string;
    name: string;
    stream: Stream | string;
    type: 'Full Time' | 'Part Time' | 'Online' | 'Distance' | 'Other';
    duration: string;
    fees: string;
    intakeCapacity: string;
    eligibility: string[];
    cardImage?: string;
    heroImage?: string;
    description: Description;
    whyChoose: WhyChoose;
    syllabus: Syllabus;
    careerOpportunities: CareerOpportunities;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface CourseResponseData {
    courses: Course[];
    pagination: Pagination;
}

export interface CourseResponse {
    success: boolean;
    data: CourseResponseData;
    message: string;
}

export interface UseCoursesParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
}
