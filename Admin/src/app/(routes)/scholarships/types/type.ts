export interface ScholarshipData {
    id: string;
    name: string;
    subTitle: string;
    type: string;
    provider: string;
    amount: string;
    deadline: string;
    applicants: string;
    status: "Active" | "Closed" | "Upcoming";
}