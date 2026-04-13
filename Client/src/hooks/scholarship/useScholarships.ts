import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface ScholarshipItem {
  _id: string;
  scholarshipName: string;
  scholarshipType:
    | 'Merit Based'
    | 'Need Based'
    | 'Government'
    | 'Private'
    | 'Sports'
    | 'Minority'
    | 'International';
  fundingType:
    | 'Full Funding'
    | 'Partial Funding'
    | 'Tuition Waiver'
    | 'Stipend'
    | 'One-Time Grant';
  deadline: string;
  totalFundingAmount: number;
  description: string;
  officialWebsite: string;
  isActive: boolean;
  status: "active" | "closed" | "upcoming";
  createdAt: string;
  updatedAt: string;
}

export interface UseScholarshipsOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  fundingType?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

interface ScholarshipsApiResponse {
  scholarships: ScholarshipItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function fetchScholarships(opts: UseScholarshipsOptions): Promise<ScholarshipsApiResponse> {
  const params: Record<string, any> = {
    page: opts.page ?? 1,
    limit: opts.limit ?? 10,
    status: opts.status || "active",
  };

  if (opts.search) params.search = opts.search;
  if (opts.type) params.type = opts.type;
  if (opts.fundingType) params.fundingType = opts.fundingType;
  if (opts.sortBy) params.sortBy = opts.sortBy;
  if (opts.order) params.order = opts.order;

  const { data } = await api.get("/scholarship", { params });
  return data?.data as ScholarshipsApiResponse;
}

export function useScholarships(opts: UseScholarshipsOptions = {}) {
  const query = useQuery<ScholarshipsApiResponse, Error>({
    queryKey: ["scholarships-list", { ...opts, status: "active" }],
    queryFn: () => fetchScholarships({ ...opts, status: "active" }),
  });

  return {
    scholarships: query.data?.scholarships ?? [],
    pagination: query.data?.pagination ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
