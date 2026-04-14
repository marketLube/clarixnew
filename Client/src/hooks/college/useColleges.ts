import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type College = any;

export interface UseCollegesOptions {
  page?: number;
  limit?: number;
  search?: string;
  stream?: string;
  city?: string;
  location?: string;
  country?: string;
  type?: string;
  ranking?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

interface CollegesApiResponse {
  colleges: College[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function fetchColleges(opts: UseCollegesOptions): Promise<CollegesApiResponse> {
  const params: Record<string, any> = {
    page: opts.page ?? 1,
    limit: opts.limit ?? 12,
  };

  if (opts.search) params.search = opts.search;
  if (opts.stream) params.stream = opts.stream;
  if (opts.city) params.location = opts.city;
  if (opts.location) params.location = opts.location;
  if (opts.country) params.country = opts.country;
  if (opts.type) params.type = opts.type;
  if (opts.ranking) params.ranking = opts.ranking;
  if (opts.sortBy) params.sortBy = opts.sortBy;
  if (opts.order) params.order = opts.order;

  const { data } = await api.get("/college", { params });
  return data?.data as CollegesApiResponse;
}

export function useColleges(opts: UseCollegesOptions = {}) {
  const query = useQuery<CollegesApiResponse, Error>({
    queryKey: ["colleges", opts],
    queryFn: () => fetchColleges(opts),
    staleTime: 5 * 60 * 1000,
  });

  return {
    colleges: query.data?.colleges ?? [],
    pagination: query.data?.pagination ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
