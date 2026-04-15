import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type Course = any;

export interface UseCourseByIdOptions {
  id: string
}



async function fetchCourseById(id: string): Promise<Course> {
  const { data } = await api.get(`/course/${id}`);
  return data?.data;
}

export function useCourseById(id: string) {
  const query = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchCourseById(id),
    staleTime: 30 * 60 * 1000,
  });

  return {
    course: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

