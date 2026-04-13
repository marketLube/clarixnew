
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SearchResult {
  colleges: any[];
  courses: any[];
  exams: any[];
  jobs: any[];
}

async function fetchGlobalSearch(query: string): Promise<SearchResult> {
  if (!query) return { colleges: [], courses: [], exams: [], jobs: [] };
  const { data } = await api.get("/search", { params: { query } });
  return data?.data as SearchResult;
}

export function useGlobalSearch(query: string) {
  const queryResult = useQuery<SearchResult, Error>({
    queryKey: ["globalSearch", query],
    queryFn: () => fetchGlobalSearch(query),
    enabled: !!query, // Only fetch if query is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    results: queryResult.data ?? { colleges: [], courses: [], exams: [], jobs: [] },
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
  };
}
