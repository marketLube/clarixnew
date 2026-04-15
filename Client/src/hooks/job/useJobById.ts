import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Job } from "./useJobs";

async function fetchJobById(id: string): Promise<Job> {
  const { data } = await api.get(`/job/${id}`);
  // Server returns ApiResponse.success(res, 200, job, ...)
  return data?.data as Job;
}

export function useJobById(id?: string) {
  const query = useQuery<Job, Error>({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id as string),
    enabled: Boolean(id),
    staleTime: 30 * 60 * 1000,
  });

  return {
    job: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
