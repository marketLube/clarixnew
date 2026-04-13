

export interface JobData {
    id: string;
    role: string;
    company: string;
    type: string;
    location: string;
    postedDate: string;
    applicants: string;
    status: "Active" | "Closed" | "Draft";
    salary?: string;
    experience?: string;
}


