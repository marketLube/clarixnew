import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type College = any;

export interface UseInfiniteCollegesOptions {
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

async function fetchColleges(
  opts: UseInfiniteCollegesOptions,
  page: number
): Promise<CollegesApiResponse> {
  const params: Record<string, any> = {
    page,
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

export function useInfiniteColleges(opts: UseInfiniteCollegesOptions = {}) {
  const query = useInfiniteQuery<CollegesApiResponse, Error>({
    queryKey: ["colleges-infinite", opts],
    queryFn: ({ pageParam }) => fetchColleges(opts, pageParam as number),
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });

  // Deduplicate colleges across pages (prevents React key warnings)
  const allColleges = (() => {
    const raw = query.data?.pages.flatMap((page) => page.colleges) ?? [];
    const seen = new Set<string>();
    return raw.filter((c) => {
      if (seen.has(c._id)) return false;
      seen.add(c._id);
      return true;
    });
  })();
  const totalCount = query.data?.pages[0]?.pagination.total ?? 0;

  return {
    colleges: allColleges,
    totalCount,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
