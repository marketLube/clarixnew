
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SearchResult {
  colleges: any[];
  courses: any[];
  exams: any[];
  jobs: any[];
  blogs: any[];
  scholarships: any[];
}

const EMPTY_RESULTS: SearchResult = {
  colleges: [],
  courses: [],
  exams: [],
  jobs: [],
  blogs: [],
  scholarships: [],
};

async function fetchGlobalSearch(query: string): Promise<SearchResult> {
  if (!query) return EMPTY_RESULTS;
  const { data } = await api.get("/search", { params: { query } });
  const payload = (data?.data ?? {}) as Partial<SearchResult>;
  // Defensive: ensure every category is always an array even if the
  // server hasn't been redeployed with the new fields yet.
  return {
    colleges: payload.colleges ?? [],
    courses: payload.courses ?? [],
    exams: payload.exams ?? [],
    jobs: payload.jobs ?? [],
    blogs: payload.blogs ?? [],
    scholarships: payload.scholarships ?? [],
  };
}

export function useGlobalSearch(query: string) {
  const queryResult = useQuery<SearchResult, Error>({
    queryKey: ["globalSearch", query],
    queryFn: () => fetchGlobalSearch(query),
    enabled: !!query, // Only fetch if query is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    results: queryResult.data ?? EMPTY_RESULTS,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
  };
}
