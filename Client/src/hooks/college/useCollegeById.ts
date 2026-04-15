import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

type College = any;

export interface UseCollegeByIdOptions {
  id: string
}



async function fetchCollegeById(id: string): Promise<College> {
  const { data } = await api.get(`/college/${id}`);
  return data?.data;
}

export function useCollegeById(id: string) {
  const query = useQuery({
    queryKey: ["colleges", id],
    queryFn: () => fetchCollegeById(id),
    staleTime: 30 * 60 * 1000,
  });

  return {
    college: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
