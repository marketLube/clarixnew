import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Course, UseCoursesOptions } from "./useCourses";

interface CoursesApiResponse {
  courses: Course[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function fetchCourses(
  opts: UseCoursesOptions,
  page: number
): Promise<CoursesApiResponse> {
  const params: Record<string, any> = {
    page,
    limit: opts.limit ?? 12,
  };

  if (opts.search) params.search = opts.search;
  if (opts.courseLevel) params.courseLevel = opts.courseLevel;
  if (opts.stream) params.stream = opts.stream;
  if (opts.sortBy) params.sortBy = opts.sortBy;
  if (opts.order) params.order = opts.order;

  const { data } = await api.get("/course", { params });
  return data?.data as CoursesApiResponse;
}

export function useInfiniteCourses(opts: UseCoursesOptions = {}) {
  const query = useInfiniteQuery<CoursesApiResponse, Error>({
    queryKey: ["courses-infinite", opts],
    queryFn: ({ pageParam }) => fetchCourses(opts, pageParam as number),
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });

  const allCourses = (() => {
    const raw = query.data?.pages.flatMap((p) => p.courses) ?? [];
    const seen = new Set<string>();
    return raw.filter((c) => {
      if (seen.has(c._id)) return false;
      seen.add(c._id);
      return true;
    });
  })();

  const totalCount = query.data?.pages[0]?.pagination.total ?? 0;

  return {
    courses: allCourses,
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
