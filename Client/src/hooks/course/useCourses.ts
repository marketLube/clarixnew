
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Course {
  _id: string;
  name: string;
  courseFullname: string;
  courseLevel: string; // e.g. "Undergraduate"
  duration: string;
  examinationType: string; // e.g. "Semester"
  eligibility: string;
  averageFees: {
    min: string | number;
    max: string | number;
  }; 
  // Add other fields as they appear in the API
  stream?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UseCoursesOptions {
  page?: number;
  limit?: number;
  search?: string;
  courseLevel?: string;
  stream?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

interface CoursesApiResponse {
  courses: Course[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function fetchCourses(opts: UseCoursesOptions): Promise<CoursesApiResponse> {
  const params: Record<string, any> = {
    page: opts.page ?? 1,
    limit: opts.limit ?? 10,
  };

  if (opts.search) params.search = opts.search;
  if (opts.courseLevel) params.courseLevel = opts.courseLevel;
  if (opts.stream) params.stream = opts.stream;
  if (opts.sortBy) params.sortBy = opts.sortBy;
  if (opts.order) params.order = opts.order;

  const { data } = await api.get("/course", { params });
  return data?.data as CoursesApiResponse;
}

export function useCourses(opts: UseCoursesOptions = {}) {
  const query = useQuery<CoursesApiResponse, Error>({
    queryKey: ["courses-list", opts],
    queryFn: () => fetchCourses(opts),
  });

  return {
    courses: query.data?.courses ?? [],
    pagination: query.data?.pagination ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
