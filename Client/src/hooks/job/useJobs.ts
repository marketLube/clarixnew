import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  jobType: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
  location: string;
  salary: {
    min: number;
    max: number;
    unit: 'LPA' | 'Monthly' | 'Hourly';
  };
  companyWebsite?: string;
  employeeSize?: string;
  industry?: string;
  shortDescription?: string;
  aboutJob: string;
  aboutYou: string[];
  aboutRole: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UseJobsOptions {
  page?: number;
  limit?: number;
  search?: string;
  jobType?: 'Full Time' | 'Part Time' | 'Internship' | 'Contract' | 'Freelance';
  location?: string;
  status?: 'active' | 'inactive';
  sortBy?: 'jobTitle' | 'companyName' | 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
}

interface JobsApiResponse {
  jobs: Job[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function fetchJobs(opts: UseJobsOptions): Promise<JobsApiResponse> {
  const params: Record<string, any> = {
    page: opts.page ?? 1,
    limit: opts.limit ?? 10,
  };

  if (opts.search) params.search = opts.search;
  if (opts.jobType) params.jobType = opts.jobType;
  if (opts.location) params.location = opts.location;
  if (opts.status) params.status = opts.status;
  if (opts.sortBy) params.sortBy = opts.sortBy;
  if (opts.order) params.order = opts.order;

  const { data } = await api.get("/job", { params });
  return data?.data as JobsApiResponse;
}

export function useJobs(opts: UseJobsOptions = {}) {
  const query = useQuery<JobsApiResponse, Error>({
    queryKey: ["jobs", opts],
    queryFn: () => fetchJobs(opts),
    staleTime: 5 * 60 * 1000,
  });

  return {
    jobs: query.data?.jobs ?? [],
    pagination: query.data?.pagination ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
