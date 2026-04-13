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
  sortBy?: string; // Add sortBy
  order?: "asc" | "desc"; // Add order
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
  if (opts.city) params.city = opts.city;
  if (opts.location) params.location = opts.location;
  if (opts.sortBy) params.sortBy = opts.sortBy; // Add to params
  if (opts.order) params.order = opts.order;     // Add to params

  const { data } = await api.get("/college", { params });
  return data?.data as CollegesApiResponse;
}

export function useColleges(opts: UseCollegesOptions = {}) {
  const query = useQuery<CollegesApiResponse, Error>({
    queryKey: ["colleges", opts],
    queryFn: () => fetchColleges(opts),
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
