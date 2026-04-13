export interface FAQItem {
    question: string;
    answer: string;
}

export interface Salary {
    min: number;
    max: number;
    unit: 'LPA' | 'Monthly' | 'Hourly';
}

export interface Job {
    _id: string;
    jobTitle: string;
    companyName: string;
    jobType: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
    location: string;
    salary: Salary;
    companyWebsite?: string;
    employeeSize?: string;
    industry?: string;
    shortDescription?: string;
    aboutJob: string;
    aboutYou: string[];
    aboutRole: string[];
    faqs: FAQItem[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface JobPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface JobResponse {
    success: boolean;
    data: {
        jobs: Job[];
        pagination: JobPagination;
    };
    message: string;
}

export interface UseJobsParams {
    page?: number;
    limit?: number;
    search?: string;
    jobType?: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
    location?: string;
    status?: 'active' | 'inactive';
    sortBy?: 'jobTitle' | 'companyName' | 'createdAt' | 'updatedAt';
    order?: 'asc' | 'desc';
}

export interface CreateJobPayload {
    jobTitle: string;
    companyName: string;
    jobType: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
    location: string;
    salary: Salary;
    companyWebsite?: string;
    employeeSize?: string;
    industry?: string;
    shortDescription?: string;
    aboutJob: string;
    aboutYou: string[];
    aboutRole: string[];
    faqs: FAQItem[];
}

export interface UpdateJobPayload {
    jobTitle?: string;
    companyName?: string;
    jobType?: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
    location?: string;
    salary?: Salary;
    companyWebsite?: string;
    employeeSize?: string;
    industry?: string;
    shortDescription?: string;
    aboutJob?: string;
    aboutYou?: string[];
    aboutRole?: string[];
    faqs?: FAQItem[];
    isActive?: boolean;
}

